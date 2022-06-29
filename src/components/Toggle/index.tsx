import React, { useState } from 'react';
import {
    Container,
    ToggleLabel,
    ToggleSelector

} from './styles'

// const [value,setValue] = useState(false);
export const Toggle: React.FC = () => {
    let [value, setValue] = useState(true);

    return (
        <Container>
            <ToggleLabel>Light</ToggleLabel>
            <ToggleSelector
                checked={value}
                uncheckedIcon={false}
                checkedIcon={false}
                onChange={() => {
                    value ?
                        setValue(false) : setValue(true)
                }}
            />
            <ToggleLabel>Dark</ToggleLabel>
        </Container>
    )

}