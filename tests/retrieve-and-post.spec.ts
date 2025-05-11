import { test } from '@playwright/test'
import { RetrievePlayerCount } from '../support/getPlayerCount'
import { PostOnBluesky } from '../support/postOnBluesky'

test('Fetch data from Steam API and post through Bluesky ATP Agent', async ({}) => {

    // Call resource
    const retrievePlayerCount: RetrievePlayerCount = new RetrievePlayerCount
    const postOnBluesky: PostOnBluesky = new PostOnBluesky

    // Retrieve player count
    const playerCount =  await retrievePlayerCount.byAppId()

    // Post on bluesky
    const post = await postOnBluesky.post(playerCount)

})