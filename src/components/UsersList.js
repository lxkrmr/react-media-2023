import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import { useThunk } from '../hooks/use-thunk';
import Skeleton from './Skeleton';
import Button from './Button';
import UsersListItem from './UsersListItem';

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  useEffect(() => doFetchUsers(), [doFetchUsers]);

  const handleUserAdd = () => doCreateUser();

  const { data } = useSelector((state) => {
    return state.users;
  });

  const content = (isLoading, err, data) => {
    if (isLoading) {
      return <Skeleton times={6} className="h-10 w-full" />;
    }

    if (err) {
      return <div>Error fetching data ...</div>;
    }

    return data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
    });
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add user
        </Button>
        {creatingUserError && 'Error creating user...'}
      </div>
      {content(isLoadingUsers, loadingUsersError, data)}
    </div>
  );
}

export default UsersList;
