const authConfig = {
  providers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  },
  pages: {
    signIn: '/login',
    signUp: '/signup'
  }
};

export default authConfig;
