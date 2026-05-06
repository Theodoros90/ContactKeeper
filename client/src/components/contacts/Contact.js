// Contact.js - Displays the list of contacts
import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';
import ContactFilter from './ContactFilter';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Contact = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered, getContacts } = contactContext;
    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, []);

    const contactList = filtered || contacts;
    // Store refs for each contact
    const refs = useRef({});

    // Debug log
    console.log('ContactList:', contactList);

    const hasContacts = Array.isArray(contactList) && contactList.length > 0;

    return (
        <div className="py-4" style={{ minHeight: '100vh' }}>
            <ContactFilter />
            <div className="row g-4">
                {hasContacts && (
                    <TransitionGroup component={null}>
                        {contactList.map(contact => {
                            const key = contact.id || contact._id;
                            if (!refs.current[key]) {
                                refs.current[key] = React.createRef();
                            }
                            const nodeRef = refs.current[key];
                            return (
                                <CSSTransition
                                    key={key}
                                    timeout={300}
                                    classNames="item"
                                    nodeRef={nodeRef}
                                >
                                    <div className="col-12" ref={nodeRef}>
                                        <ContactItem contact={contact} ref={nodeRef} />
                                    </div>
                                </CSSTransition>
                            );
                        })}
                    </TransitionGroup>
                )}
                {!hasContacts && (
                    <div className="col-12">
                        <div className="alert alert-info text-center">No contacts found.</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Contact;
