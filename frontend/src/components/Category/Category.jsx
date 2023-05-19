import {useParams} from 'react-router-dom';

export function Category() {
  const {id} = useParams();
  return <>{id}</>;
}
