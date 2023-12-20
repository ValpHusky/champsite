import RetroHitCounter from 'react-retro-hit-counter';
import { useEffect } from 'react';
import { updateViews } from 'utility/services';
import { useGetViews, useViews } from 'store';

function isNewVisit() {
    const current = Boolean(sessionStorage.getItem('session'));
    let newvisit = false
  
    if (!current) {
      newvisit = true
    }
  
    sessionStorage.setItem('session', '1');
  
    return newvisit;
  }

export default function PageCounter() {

    const getViews = useGetViews()
    const views = useViews()

    useEffect(() => {
        if (isNewVisit()) {
            updateViews()
        }
        getViews()
    }, [getViews])

    return (
        <RetroHitCounter
            hits={views}
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