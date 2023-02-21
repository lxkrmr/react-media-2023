import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store';

function UsersList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const { isLoading, error, data } = useSelector((state) => {
    return state.users;
  });

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>Error fetching data: ${error.message}</div>;
  }

  const renderedUsers = data.map((user) => {
    return <div key={user.id}>{user.name}</div>;
  });

  return <div>{renderedUsers}</div>;
}

export default UsersList;
