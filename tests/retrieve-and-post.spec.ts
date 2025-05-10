import { test } from '@playwright/test'
import { RetrievePlayerCount } from '../support/getPlayerCount'
import { PostOnBluesky } from '../support/postOnBluesky'

test('Placeholder name', async ({}) => {

    // Call resource
    const retrievePlayerCount: RetrievePlayerCount = new RetrievePlayerCount
    const postOnBluesky: PostOnBluesky = new PostOnBluesky

    // Retrieve player count
    const playerCount =  await retrievePlayerCount.byAppId()

    // Post on bluesky
    const post = await postOnBluesky.post(playerCount)

})