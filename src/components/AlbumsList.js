import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Skeleton from './Skeleton';
import AlbumsListItem from './AlbumsListItem';
import Button from './Button';

function AlbumList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => addAlbum(user);

  const content = (isLoading, error, data) => {
    if (isLoading) {
      return <Skeleton times={3} className="h-10 w-full" />;
    }

    if (error) {
      return <div>Error loading albums.</div>;
    }

    return data.map((album) => {
      return <AlbumsListItem key={album.id} album={album} />;
    });
  };

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
      <div>{content(isLoading, error, data)}</div>
    </div>
  );
}

export default AlbumList;
