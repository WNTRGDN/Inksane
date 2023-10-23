import type { NextApiRequest, NextApiResponse } from 'next'
import { FormEvent } from 'react'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const data = await fetch(`${process.env.API_HOST?.toString()}/api/commerce/customer/search`, {
        method: req.method,
        headers: {
            'ApiKey': process.env.API_KEY ?? '',
            'StripeApiKey': process.env.STRIPE_API_KEY ?? ''
        },
        //body: JSON.stringify(data)
    })
    
    res.status(200).json(data.json())
}

export default handler