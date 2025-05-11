import { expect } from '@playwright/test'
import { AtpAgent } from '@atproto/api'

export class PostOnBluesky {

    async post(playerCount: string) {

        // String to be posted/logged
        const postText = 'Destiny 2 has currently ' + playerCount + ' players online on PC (Steam). #Destiny2'

        // Starting session
        const agent = new AtpAgent({ service: process.env.BLUESKY_SERVICE as string })

        // Logging In
        const login = await agent.login({
            identifier: process.env.BLUESKY_CREDENTIAL_USER as string,
            password: process.env.BLUESKY_CREDENTIAL_PASSWORD as string
        })

        // FF Control
        const FFGlobalEnabled = process.env.FFGlobalEnabled as string

        // FF condition
        if (FFGlobalEnabled == "true") {
            // Post
            const post = await agent.post({
                text: postText,
                langs: ['en'],
                facets: [
                    {
                        index: {
                            byteStart: 61,
                            byteEnd: 71
                        },
                        features: [{
                            $type: 'app.bsky.richtext.facet#tag',
                            tag: 'Destiny2'
                        }]
                    }
                ]
            })
            expect(post.uri).toBeDefined()
            expect(post.cid).toBeDefined()
        }
        else {
            console.log('FF is disabled.')
        }
        console.log(postText)
    }

}