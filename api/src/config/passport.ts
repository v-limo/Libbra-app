import console from 'console'
import FacebookStrategy from 'passport-facebook'
import GoogleTokenStrategy from 'passport-google-id-token'
import passportJwt from 'passport-jwt'

import User from '../models/userModel'
import {
  FACEBOOK_ID,
  FACEBOOK_SECRET,
  GOOGLE_CLIENT_ID,
  JWT_SECRET,
} from '../util/secrets'

// Find one or create a new user
const findOrCreate = async (email: string, userName: string) => {
  const userDatabase = await User.findOne({ email }).select(
    '-__v -updatedAt -createdAt'
  )
  if (userDatabase) {
    return userDatabase
  } else {
    await User.create({ email, userName })
    return await User.findOne({ email }).select('-__v -updatedAt -createdAt')
  }
}

// google TOKEN ID
export const googleTokenStrategy = new GoogleTokenStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
  },
  async (parsedToken: any, googleId: any, done: any) => {
    const email = parsedToken.payload.email
    const userName = parsedToken.payload.name
    const user = await findOrCreate(email, userName)
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  }
)

//passport jwt strategy
const JwtStrategy = passportJwt.Strategy
const extractJwt = passportJwt.ExtractJwt

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (payload: any, done: any) => {
    const user = await User.findById(payload.id)
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  }
)

// // facebook strategy here
// export const facebookStrategy = new FacebookStrategy.Strategy(
//   {
//     clientID: FACEBOOK_ID,
//     clientSecret: FACEBOOK_SECRET,
//     callbackURL: 'http://localhost:5000/api/v1/users/facebook/callback',
//     profileFields: ['id', 'displayName', 'email'],
//   },
//   async (accessToken: any, refreshToken: any, profile: any, done: any) => {
//     console.log({ profile })
//     const email = profile.emails[0].value
//     const userName = profile.displayName
//     const user = await findOrCreate(email, userName)
//     console.log('Facebook : ' + user)
//     if (user) {
//       done(null, user)
//     } else {
//       done(null, false)
//     }
//   }
// )

// // facebook strategy here
// export const facebookLogin = passport.authenticate('facebook', {
//   session: false,
// })

// // google strategy here
// export const googleLogin = passport.authenticate('google-id-token', {
//   session: false,
// })

// // google strategy here
// export const githubLogin = passport.authenticate('github', {
//   session: false,
// })

// // jwt strategy here
// export const jwtLogin = passport.authenticate('jwt', {
//   session: false,
// })
