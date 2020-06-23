import PropTypes from 'prop-types';
import * as e from './styles';

export default function Property({
    model,
    onClick,
}) {
    return (
        <e.Container>
            <e.Title>{model.address1}</e.Title>

            <e.Address>
                {model.city}, {model.postalCode}, {model.state}
            </e.Address>

            <e.Button
                onClick={() => { onClick(model); }}
            >View Lo.ca.tion.</e.Button>
        </e.Container>
    );
}

Property.propTypes = {
    model: PropTypes.shape({
        address1: PropTypes.string.isRequired,
        city: PropTypes.string.isrequired,
        postalCode: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};
