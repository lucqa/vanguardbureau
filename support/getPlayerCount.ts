import { expect, request } from '@playwright/test'

export class RetrievePlayerCount {

    async byAppId() {

        // Calling data from vault
        const appID = process.env.APP_ID as string
        const appKey = process.env.APP_KEY as string

        // Constructing base URL
        const baseURI = 'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=' + appID + ' &key=' + appKey

        // Prepare context
        const context = await request.newContext()

        // Call Steampowered to retrieve concurrent players
        const response = await context.get(baseURI)

        // Treating data
        const responseJson = await response.json()
        const playerCount = new Intl.NumberFormat('en-us', {minimumFractionDigits: 0}).format(await responseJson.response.player_count)

        // Assertion call was success
        expect(response).toBeOK()
        expect(playerCount).toBeDefined()

        // Return player count
        return playerCount

    }

}