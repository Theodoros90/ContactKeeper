
import Contact from '../contacts/Contact';
import ContactForm from '../contacts/ContactForm';


const Home = () => {
    return (
        <div className="contacts-layout sticky-form-parent">
            <div className="contacts-list-section">
                <Contact />
            </div>
            <div className="contacts-form-section">
                <ContactForm />
            </div>
        </div>
    );
};

export default Home;
