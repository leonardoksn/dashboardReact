import React from 'react';
import { Container } from './styles';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';




const List: React.FC = () => {

    const options = [
        
        {value : 'Robrigo', label : 'Rodrigo'},
        {value: 'Joao', label : 'Joao'},
        {value: 'A', label : 'A'}
    ];

    return (
        <Container>
            <ContentHeader title='Saídas' lineColor='#E44c4E'>
                <SelectInput options={options}/>
                <SelectInput options={options}/>
            </ContentHeader> 
        </Container>
    );
}

export default List;