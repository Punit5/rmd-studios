import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        const { name, email, phone, eventType, eventDate, message } = await req.json()

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: process.env.CONTACT_EMAIL!,
            subject: `New Booking Request — ${name}`,
            html: `
                <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1C1A18;">
                    <div style="background: #2D1F18; padding: 32px; text-align: center;">
                        <h1 style="color: #C4A882; font-size: 24px; margin: 0; letter-spacing: 0.2em; text-transform: uppercase;">New Booking Request</h1>
                    </div>
                    <div style="padding: 40px 32px; background: #FAF8F5;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr style="border-bottom: 1px solid #e8e0d8;">
                                <td style="padding: 14px 0; color: #C4A882; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; width: 140px;">Name</td>
                                <td style="padding: 14px 0; font-size: 15px;">${name}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e8e0d8;">
                                <td style="padding: 14px 0; color: #C4A882; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em;">Email</td>
                                <td style="padding: 14px 0; font-size: 15px;"><a href="mailto:${email}" style="color: #1C1A18;">${email}</a></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e8e0d8;">
                                <td style="padding: 14px 0; color: #C4A882; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em;">Phone</td>
                                <td style="padding: 14px 0; font-size: 15px;">${phone || '—'}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e8e0d8;">
                                <td style="padding: 14px 0; color: #C4A882; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em;">Event Type</td>
                                <td style="padding: 14px 0; font-size: 15px;">${eventType || '—'}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e8e0d8;">
                                <td style="padding: 14px 0; color: #C4A882; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em;">Event Date</td>
                                <td style="padding: 14px 0; font-size: 15px;">${eventDate || '—'}</td>
                            </tr>
                            ${message ? `
                            <tr>
                                <td style="padding: 14px 0; color: #C4A882; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; vertical-align: top;">Message</td>
                                <td style="padding: 14px 0; font-size: 15px; line-height: 1.6;">${message}</td>
                            </tr>
                            ` : ''}
                        </table>
                        <div style="margin-top: 32px; padding: 20px; background: #2D1F18; border-left: 3px solid #C4A882;">
                            <p style="margin: 0; color: #C4A882; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase;">Reply directly to this email to reach ${name}</p>
                        </div>
                    </div>
                    <div style="padding: 20px 32px; background: #2D1F18; text-align: center;">
                        <p style="margin: 0; color: #ffffff40; font-size: 11px; letter-spacing: 0.1em;">RMD Studios · West Abbotsford, B.C.</p>
                    </div>
                </div>
            `,
            replyTo: email,
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Email error:', error)
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }
}
