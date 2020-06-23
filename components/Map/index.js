import PropTypes from 'prop-types';
import * as rl from 'react-leaflet';
import {
    useCallback,
    useRef,
    useState,
} from 'react';
import { useMount } from 'react-use';
import { createIcon, getBounds } from './utils';
import * as e from './styles';

export default function Map({ models }) {
    const [center, setCenter] = useState([51.505, -0.09])
    const ref = useRef();

    const handleFitBounds = useCallback(() => {
        ref.current.leafletElement.fitBounds(getBounds(models), { padding: [20, 20] });
    }, []);

    useMount(handleFitBounds);

    return (
        <e.Container>
            <rl.Map ref={ref} center={center} zoom={13}>
                <rl.TileLayer url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}@2x.png" />

                {models.map((model) => (
                    <rl.Marker
                        key={model.address1}
                        position={[model.coordinates.lat, model.coordinates.lng]}
                        icon={createIcon()}
                    />
                ))}
            </rl.Map>

            <e.Button onClick={handleFitBounds}>Reset View</e.Button>
        </e.Container>
    );
}

Map.propTypes = {
    models: PropTypes.arrayOf(
        PropTypes.shape({
            coordinates: PropTypes.shape({
                lat: PropTypes.number.isRequired,
                lng: PropTypes.number.isRequired,
            }).isRequired,
        })
    ).isRequired,
};
