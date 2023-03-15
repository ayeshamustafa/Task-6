import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '../components/Container';
import ErrorAlert from '../components/ErrorAlert';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BackButton = () => {
  return (
    <div className="my-6">
      <Link to= "/books" className="bg-black-300 hover:bg-black-400 px-4 py-2 rounded">
        &lt; Back to Books
      </Link>
    </div>
  );
};

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBook = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.matgargano.com/api/books/${id}`);
      const data = await response.json();
      setBook(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Skeleton count={10} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorAlert>{error}</ErrorAlert>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton />
      {book && (
        <>
             <div className="flex">
                <img src={book.imageURL} alt={book.title} className="mr-4" />
                <div>
                    <h1 className="text-3xl font-bold mb-4">{book.title}</h1>                
                    <p className="text-black-600 mb-2">Book ID: {book.id}</p>
                    <p className="text-black-600 mb-2">Author: {book.author}</p>
                    <p className="text-black-600 mb-2">Publisher: {book.publisher}</p>
                    <p className="text-black-600 mb-2">Pages: {book.pages}</p>
                    <p className="text-black-600 mb-2">Year: {book.year}</p>
                    <p className="text-black-600 mb-2">Country: {book.country}</p>
                </div>
            </div>
        </>
        
      )}
    </Container>
  );
};

export default Book;


