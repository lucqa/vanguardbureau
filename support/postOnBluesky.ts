import { expect } from '@playwright/test'
import { AtpAgent } from '@atproto/api'

export class PostOnBluesky {

    async post(playerCount: any) {

        let postText:any

        // Verify Player Count = 0
        if ((playerCount == 0) || (playerCount == '0')) {

            // String to be posted/logged
            postText = 'Unable to fetch Destiny 2 player population.\n\nPlease check if maintenance is in progress at @bungieserverstatus.bungie.net. #Destiny2'

            // Feature Flag Control
            if (process.env.FFGlobalEnabled == 'true') {

                // Starting session
                const agent = new AtpAgent({ service: process.env.BLUESKY_SERVICE as string })

                // Logging In
                const login = await agent.login({
                    identifier: process.env.BLUESKY_CREDENTIAL_USER as string,
                    password: process.env.BLUESKY_CREDENTIAL_PASSWORD as string
                })

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
                        },
                        {
                            index: {
                                byteStart: postText.length - 41,
                                byteEnd: postText.length - 11
                            },
                            features: [{
                                $type: 'app.bsky.richtext.facet#mention',
                                did: 'did:plc:pekfvt52gjy5qunf3jcdvze4'
                            }]
                        }
                    ]
                })

                // Assertion
                expect(post.uri).toBeDefined()
                expect(post.cid).toBeDefined()
            }

            else {
                console.log('FF disabled. No post was created. String:\n' + postText)
            }

        }

        // if !=0
        else {

            // String to be posted/logged
            postText = 'Destiny 2 has currently ' + playerCount + ' players online on PC (Steam). #Destiny2'

            // Feature Flag Control
            if (process.env.FFGlobalEnabled == 'true') {

                // Starting session
                const agent = new AtpAgent({ service: process.env.BLUESKY_SERVICE as string })

                // Logging In
                const login = await agent.login({
                    identifier: process.env.BLUESKY_CREDENTIAL_USER as string,
                    password: process.env.BLUESKY_CREDENTIAL_PASSWORD as string
                })

                // Post
                const post = await agent.post({
                    text: postText,
                    langs: ['en'],
                    facets: [
                        {
                            index: {
                                byteStart: postText.length - 9,
                                byteEnd: postText.length + 2
                            },
                            features: [{
                                $type: 'app.bsky.richtext.facet#tag',
                                tag: 'Destiny2'
                            }]
                        }
                    ]
                })

                // Assertion
                expect(post.uri).toBeDefined()
                expect(post.cid).toBeDefined()
            }
            
            else {
                console.log('FF disabled. No post was created. String:\n' + postText)
            }
        }

    }

}