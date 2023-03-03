import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const removeUser = createAsyncThunk('users/remove', async (user) => {
  await axios.delete(`http://localhost:3005/users/${user.id}`);

  return user; // we have to return the given user, as the delete response is empty
});

export { removeUser };
