import { useFetchAlbumsQuery } from '../store';
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';

function AlbumList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);

  const content = (isLoading, error, data) => {
    if (isLoading) {
      return <Skeleton times={3} className="h-10 w-full" />;
    }

    if (error) {
      return <div>Error loading albums.</div>;
    }

    return data.map((album) => {
      const header = <div>{album.title}</div>;
      return (
        <ExpandablePanel key={album.id} header={header}>
          List of photos in the album.
        </ExpandablePanel>
      );
    });
  };

  return (
    <div>
      <div>Albums for {user.name}</div>
      <div>{content(isLoading, error, data)}</div>
    </div>
  );
}

export default AlbumList;
