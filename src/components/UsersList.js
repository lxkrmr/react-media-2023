import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store';
import Skeleton from './Skeleton';

function UsersList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const { isLoading, error, data } = useSelector((state) => {
    return state.users;
  });

  if (isLoading) {
    return (
      <div>
        <Skeleton times={6} className="h-10 w-full" />
      </div>
    );
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
