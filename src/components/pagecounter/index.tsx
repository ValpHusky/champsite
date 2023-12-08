import RetroHitCounter from 'react-retro-hit-counter';
import countapi from 'countapi-js';
import { useEffect, useState } from 'react';

export default function PageCounter() {

    const [visits, setVisits] = useState(0)

    useEffect(() => {
        countapi.visits().then((result) => {
            setVisits(result.value);
        });
    }, [])

    return (
        <RetroHitCounter
            hits={visits}
            /* The following are all default values: */
            withBorder={true}
            withGlow={false}
            minLength={4}
            size={40}
            padding={4}
            digitSpacing={3}
            segmentThickness={4}
            segmentSpacing={0.5}
            segmentActiveColor="#76FF03"
            segmentInactiveColor="#315324"
            backgroundColor="#222222"
            borderThickness={7}
            glowStrength={0.5}
        />
    )
}