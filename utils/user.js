const getUserByEmail = async (email) => {
    return User.findOne({ email });
  };