/*import { Link } from 'react-router-dom';

async function getTerms() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/terms/records')
    const data = await res.json();
    return data?.items as any[];
}

export default async function TermsPage() {
    const terms = await getTerms();

    return (
        <div>
            <h1>Freight Webster</h1>
            <div>
                {terms?.map((term) => {
                    return <Term key={term.id} term={term} />
                })}
            </div>
        </div>
        
    )
}

function Term({ term }: any) {
    const { id, word, definition, created } = term || {};
    
    return (
        <Link to={'/terms/${id}'}>
            <div>
                <h2>{word}</h2>
                <p>{definition}</p>
                <p>{created}</p>
            </div>
        </Link>
    );
}
*/