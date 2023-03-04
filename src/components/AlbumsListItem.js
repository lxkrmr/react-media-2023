import { GoTrashcan } from 'react-icons/go';
import { useRemoveAlbumMutation } from '../store';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';

function AlbumsListItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleRemove = () => removeAlbum(album);

  const header = (
    <>
      <Button
        className="mr-3"
        loading={results.isLoading}
        onClick={handleRemove}
      >
        <GoTrashcan />
      </Button>
      {results.error && <div>Error deleting album.</div>}
      {album.title}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      List of photos in the album.
      <Button></Button>
    </ExpandablePanel>
  );
}

export default AlbumsListItem;
