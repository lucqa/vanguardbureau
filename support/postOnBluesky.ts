import { expect } from '@playwright/test'
import { AtpAgent } from '@atproto/api'

export class PostOnBluesky {

    async post(playerCount: any) {

        let postText

        if ((playerCount == '0') || (playerCount == 0)) {

            // Just log if zero
            console.log('Unable to retrieve Destiny 2 player population.')

        }

        else {

            // String to be posted/logged
            postText = 'Destiny 2 has currently ' + playerCount + ' players online on PC (Steam). #Destiny2'

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
                                byteStart: postText.length - 9,
                                byteEnd: postText.length
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


}