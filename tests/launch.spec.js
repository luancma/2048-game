/* eslint-disable no-undef */
require("expect-puppeteer")

const { getFieldPoints } = require("../rng-server/fieldUtils")
const { Server } = require("../rng-server/rngServer")
const { readDOMField, getDataStatus, setupPage, pressDirectionKeys, createSerialServerHandler } = require("./utils")

let server
let radius

const urlArg = process.argv.filter((x) => x.startsWith("--url="))[0]
const href = (urlArg && urlArg.replace("--url=", "")) || "http://localhost:3000/"

describe("Hex game launch", () => {
  beforeAll(async () => {
    server = new Server(true)
    server.start()
  }, 10000)

  afterAll(async () => {
    await server.end()
  }, 15000)

  describe("radius 2", () => {
    radius = 2

    it("should render correct field with data-x, data-y, data-z, data-value with 0", async () => {
      const handler = jest.fn(() => [])
      const expected = getFieldPoints(radius).map((c) => ({ ...c, value: 0 }))
      server.changeHandler(handler)

      await setupPage(page, href, radius)

      expect(await readDOMField(page, radius)).toEqual(expect.arrayContaining(expected))
    })

    it("should send first request automatically after game loaded", async () => {
      const cells = [{ x: 0, y: 0, z: 0, value: 8 }]
      const handler = jest.fn(() => cells)
      server.changeHandler(handler)

      await setupPage(page, href, radius)

      expect(handler).toBeCalled()
    })

    describe("moves", () => {
      it.each([
        ["north", "W", { x: 0, y: 1, z: -1 }],
        ["north-west", "Q", { x: -1, y: 1, z: 0 }],
        ["north-east", "E", { x: 1, y: 0, z: -1 }],
        ["south", "S", { x: 0, y: -1, z: 1 }],
        ["south-west", "A", { x: -1, y: 0, z: 1 }],
        ["south-east", "D", { x: 1, y: -1, z: 0 }],
      ])("should move to %s after press %s", async (_, keyCode, expected) => {
        const cells = [{ x: 0, y: 0, z: 0, value: 128 }]
        server.changeHandler((_, field) => (field.length === 0 ? cells : []))

        await setupPage(page, href, radius)
        await pressDirectionKeys(page, keyCode)

        const field = await readDOMField(page, radius)

        expect(field.filter(({ value }) => value === 128)).toEqual(
          expect.arrayContaining([{ ...expected, value: 128 }]),
        )
      })

      it("should not do anything if there are not movements done", async () => {
        const cells = [{ x: 0, y: 1, z: -1, value: 2 }]
        server.changeHandler(() => cells)
        await setupPage(page, href, radius)

        const handler = jest.fn()
        server.changeHandler(handler)
        await pressDirectionKeys(page, "W")

        expect(handler).not.toHaveBeenCalled()
      })
    })

    describe("adding", () => {
      it.each([
        [
          "should add 2 cells with same value",
          "W",
          [
            { x: 0, y: 0, z: 0, value: 2 },
            { x: 0, y: 1, z: -1, value: 2 },
          ],
          [{ x: 0, y: 1, z: -1, value: 4 }],
        ],
        [
          "should move 3 cells and add 2 cells",
          "W",
          [
            { x: 0, y: 1, z: -1, value: 2 },
            { x: 0, y: 0, z: 0, value: 2 },
            { x: 0, y: -1, z: 1, value: 2 },
          ],
          [
            { x: 0, y: 1, z: -1, value: 4 },
            { x: 0, y: 0, z: 0, value: 2 },
          ],
        ],
        [
          "should sum up 3 cells correctly (2 2 4 -> 4 4)",
          "W",
          [
            { x: 0, y: 1, z: -1, value: 4 },
            { x: 0, y: 0, z: 0, value: 2 },
            { x: 0, y: -1, z: 1, value: 2 },
          ],
          [
            { x: 0, y: 1, z: -1, value: 4 },
            { x: 0, y: 0, z: 0, value: 4 },
          ],
        ],
        [
          "should sum up 3 cells correctly (4 2 2 -> 4 4)",
          "W",
          [
            { x: 0, y: 1, z: -1, value: 2 },
            { x: 0, y: 0, z: 0, value: 2 },
            { x: 0, y: -1, z: 1, value: 4 },
          ],
          [
            { x: 0, y: 1, z: -1, value: 4 },
            { x: 0, y: 0, z: 0, value: 4 },
          ],
        ],
      ])("%s", async (_message, keyCode, startPosition, expected) => {
        server.changeHandler((_, field) => (field.length === 0 ? startPosition : []))

        await setupPage(page, href, radius)
        await pressDirectionKeys(page, keyCode)

        const field = await readDOMField(page, radius)
        expect(field.filter(({ value }) => value > 0)).toEqual(expect.arrayContaining(expected))
      })
    })

    describe("few moves", () => {
      it("should process serial of moves", async () => {
        const serverHandler = createSerialServerHandler([
          [
            { x: 0, y: 0, z: 0, value: 2 },
            { x: 0, y: 1, z: -1, value: 2 },
          ],
          [{ x: 0, y: 0, z: 0, value: 4 }],
          [{ x: 0, y: 0, z: 0, value: 8 }],
          [{ x: 0, y: 0, z: 0, value: 16 }],
        ])
        const expected = [{ x: 0, y: -1, z: 1, value: 32 }]
        server.changeHandler(serverHandler)

        await setupPage(page, href, radius)
        await pressDirectionKeys(page, "WSWS")

        const field = await readDOMField(page, radius)
        expect(field.filter(({ value }) => value > 0)).toEqual(expect.arrayContaining(expected))
      }, 10000)
    })

    describe("status", () => {
      it('should show status "playing" if game isn\'t over', async () => {
        const cells = [{ x: -1, y: 1, z: 0, value: 64 }]
        const handler = jest.fn(() => cells)
        server.changeHandler(handler)

        await setupPage(page, href, radius)

        const statusElement = await page.waitForSelector("[data-status]")
        expect(await getDataStatus(statusElement)).toBe("playing")
      })

      it('should show status "game-over" if game is over', async () => {
        const cells = [
          { x: -1, y: 1, z: 0, value: 64 },
          { x: -1, y: 0, z: 1, value: 16 },
          { x: 0, y: 1, z: -1, value: 16 },
          { x: 0, y: 0, z: 0, value: 32 },
          { x: 0, y: -1, z: 1, value: 2 },
          { x: 1, y: 0, z: -1, value: 4 },
          { x: 1, y: -1, z: 0, value: 8 },
        ]
        const handler = jest.fn(() => cells)
        server.changeHandler(handler)

        await setupPage(page, href, radius)
        await pressDirectionKeys(page, "A")

        const statusElement = await page.waitForSelector("[data-status]")
        expect(await getDataStatus(statusElement)).toBe("game-over")
      })
    })
  })

  describe("Emulate game", () => {
    it("long game #1", async () => {
      const serverHandler = createSerialServerHandler([
        [
          { x: 1, y: -1, z: 0, value: 2 },
          { x: -1, y: 1, z: 0, value: 2 },
          { x: 0, y: -1, z: 1, value: 2 },
        ],
        [{ x: -1, y: 0, z: 1, value: 2 }],
        [{ x: -1, y: 1, z: 0, value: 2 }],
        [{ x: 0, y: 0, z: 0, value: 4 }],
        [{ x: 1, y: 0, z: -1, value: 4 }],
        [
          { x: -1, y: 1, z: 0, value: 2 },
          { x: 1, y: 0, z: -1, value: 2 },
        ],
        [{ x: 0, y: 1, z: -1, value: 4 }],
        [{ x: 1, y: 0, z: -1, value: 2 }],
        [{ x: 1, y: -1, z: 0, value: 4 }],
        [
          { x: 0, y: 1, z: -1, value: 4 },
          { x: 1, y: 0, z: -1, value: 4 },
        ],
        [{ x: 0, y: 0, z: 0, value: 4 }],
        [
          { x: -1, y: 1, z: 0, value: 4 },
          { x: 0, y: 1, z: -1, value: 4 },
        ],
        [{ x: 1, y: -1, z: 0, value: 4 }],
        [{ x: 0, y: 1, z: -1, value: 2 }],
        [{ x: 0, y: 0, z: 0, value: 4 }],
        [{ x: 1, y: 0, z: -1, value: 4 }],
        [{ x: -1, y: 1, z: 0, value: 4 }],
        [{ x: 1, y: 0, z: -1, value: 2 }],
        [{ x: 1, y: 0, z: -1, value: 2 }],
        [{ x: 1, y: 0, z: -1, value: 2 }],
        [
          { x: 1, y: -1, z: 0, value: 4 },
          { x: 1, y: 0, z: -1, value: 4 },
        ],
        [{ x: 0, y: 1, z: -1, value: 2 }],
        [{ x: 1, y: -1, z: 0, value: 2 }],
        [{ x: 0, y: -1, z: 1, value: 4 }],
        [
          { x: 1, y: 0, z: -1, value: 2 },
          { x: 1, y: -1, z: 0, value: 2 },
        ],
        [
          { x: 0, y: -1, z: 1, value: 2 },
          { x: 1, y: -1, z: 0, value: 2 },
        ],
        [{ x: 1, y: -1, z: 0, value: 4 }],
        [{ x: 1, y: -1, z: 0, value: 2 }],
        [{ x: 1, y: -1, z: 0, value: 2 }],
        [{ x: 1, y: -1, z: 0, value: 2 }],
        [
          { x: 1, y: -1, z: 0, value: 2 },
          { x: 0, y: -1, z: 1, value: 2 },
        ],
        [{ x: 0, y: -1, z: 1, value: 2 }],
        [{ x: 0, y: -1, z: 1, value: 2 }],
        [{ x: 1, y: 0, z: -1, value: 2 }],
        [{ x: 0, y: -1, z: 1, value: 4 }],
        [{ x: 0, y: -1, z: 1, value: 4 }],
        [{ x: 1, y: 0, z: -1, value: 2 }],
        [{ x: 0, y: -1, z: 1, value: 4 }],
        [{ x: 1, y: -1, z: 0, value: 2 }],
        [{ x: 0, y: -1, z: 1, value: 2 }],
        [
          { x: 1, y: -1, z: 0, value: 2 },
          { x: 1, y: 0, z: -1, value: 2 },
        ],
        [{ x: 1, y: 0, z: -1, value: 4 }],
        [{ x: -1, y: 0, z: 1, value: 4 }],
        [{ x: 0, y: -1, z: 1, value: 4 }],
        [
          { x: 0, y: 1, z: -1, value: 4 },
          { x: -1, y: 1, z: 0, value: 4 },
        ],
        [{ x: 0, y: 1, z: -1, value: 4 }],
        [{ x: 0, y: 1, z: -1, value: 2 }],
      ])
      const expected = [
        { value: 4, x: 1, y: 0, z: -1 },
        { value: 2, x: 1, y: -1, z: 0 },
        { value: 2, x: 0, y: 1, z: -1 },
        { value: 16, x: 0, y: 0, z: 0 },
        { value: 8, x: 0, y: -1, z: 1 },
        { value: 8, x: -1, y: 1, z: 0 },
        { value: 128, x: -1, y: 0, z: 1 },
      ]
      server.changeHandler(serverHandler)

      await setupPage(page, href, radius)
      await pressDirectionKeys(page, "DDADSASADDSASDQDAQAAAQWQWAAWAWWEAWEAWQWASWQDAD")

      expect(await readDOMField(page, radius)).toEqual(expect.arrayContaining(expected))
    }, 60000)
  })
})
