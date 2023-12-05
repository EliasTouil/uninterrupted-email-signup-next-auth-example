This is an example project to demonstrate a specific passwordless use case of next-auth with CredentialProvider.

We will use postgres as a database and Prisma as an ORM. Hopefully you can reproduce this example with your own stack.

## The use case

Some user flows require creating a user and keeping track of a session even if the user did not properly sign up. Signing up with a magic link can cause dramatic churn or bounce as user don't want to got to their email client to complete a specific flow. next-auth does not have support for 'anonymous user' (concept borrowed from GCP/Firebase auth) that allows use to tie actions and entities to a user before it's signed up. It may be appropriate for you to sign in a user by smply requiring their email and not interrupt their flow.

### Flow we want to create

This is a community chat, we want users to be able to post as fast as possible when they get onto the platform.

The user lands on an onboarding flow
The user provides an email and can keep going as a authenticated user
In the background, an email is sent with a verification link. (see console)
User can submit a post
User can go to a protected page, and see their linked Post entity.
User sees a message telling them they're not verified, and need to verify to **_sensitive actions_**

## Getting Started

First

```bash
npm install
```

Then
Create two postgresql databases, one non-pooling (or not, I don't think it matters for this example project).
Add the two postgres url in the env file.

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Other notes

If you want to use this I suggest you cmd+f all the //TODO comments and go through them one by one.

## Warnings

This was created to be used with insensitive data, please use with caution and keep your user's interest in mind when manipulating their identity.
