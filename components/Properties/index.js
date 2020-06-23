import PropTypes from 'prop-types';
import Property from '@app/Property';
import * as e from './styles';

export default function Properties({
    models,
    onPropertyClicked,
}) {
    return (
        <e.Container>
            {models.map((model) => (
                <Property
                    key={model.address1}
                    model={model}
                    onClick={onPropertyClicked}
                />
            ))}
        </e.Container>
    );
}

Properties.propTypes = {
    models: PropTypes.array.isRequired,
    onPropertyClicked: PropTypes.func.isRequired,
};
