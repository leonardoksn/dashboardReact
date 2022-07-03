import React, { useMemo, useState, useEffect } from 'react';
import { Container, Content, Filters } from './styles';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';

import { useParams } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

interface IData {
    id: number | string;
    description: string;
    amountFormated: string;
    frequency: string;
    dataFormatted: string;
    tagColor: string;
}

const List: React.FC = () => {

    const [data, setData] = useState<IData[]>([]);
    const [mouthSelected, setMouthSelected] = useState<string>(String(new Date().getMonth() + 1));
    const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear() - 2));

    const { type } = useParams();
    const title = useMemo(() => {
        return type === "entry-balance" ?
            {
                title: 'Entradas',
                lineColor: '#F7931B'
            } :
            {
                title: 'Saídas',
                lineColor: '#E44C4E'
            };
    }, [type]);

    const listData = useMemo(() => {
        if (type === 'entry-balance'){
            return gains;
        }
        else if (type === 'exit-balance'){
            return expenses;
        }else 
            return gains;
    }, [type]);

    const months = [
        { value: 1, label: 'Janeiro' },
        { value: 2, label: 'Fevereiro' },
        { value: 3, label: 'Março' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Maio' },
        { value: 6, label: 'Junho' },
        { value: 7, label: 'Julho' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Setembro' },
        { value: 10, label: 'Outubro' },
        { value: 11, label: 'Novembro' },
        { value: 12, label: 'Dezembro' },
    ];

    const years = [

        { value: 2022, label: 2022 },
        { value: 2021, label: 2021 },
        { value: 2020, label: 2020 },
    ];

    useEffect(() => {

        const filtredData = listData.filter(item => {
            const date = new Date(item.date);
            const mounth = String(date.getMonth() + 1);
            const year = String(date.getFullYear());

            return mounth === mouthSelected && year === yearSelected;
        });

        const response = filtredData.map(item => {
       
            return {
                id: String(Math.floor(Math.random() * 9999)),
                description: item.description,
                amountFormated: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dataFormatted: formatDate(item.date),
                tagColor: item.frequency === 'eventual' ? '#4E41F0' : '#E44C4E'
            }
        })
       
        setData(response);
    }, [listData,mouthSelected,yearSelected, data.length]);
    return (
        <Container>
            <ContentHeader title={title.title} lineColor={title.lineColor}>
                <SelectInput options={months} onChange={(e) => setMouthSelected(e.target.value)} defaultValue={mouthSelected} />
                <SelectInput options={years} onChange={(e) => setYearSelected(e.target.value)} defaultValue={yearSelected} />
            </ContentHeader>

            <Filters>
                <button
                    type="button"
                    className='tag-filter tag-filter-recurrent'
                >
                    Recorrentes
                </button>

                <button
                    type="button"
                    className='tag-filter tag-filter-eventual'
                >
                    Eventuais
                </button>
            </Filters>
            <Content>
                {
                    data.map((item) =>
                    (
                        <HistoryFinanceCard
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dataFormatted}
                            amount={item.amountFormated}
                        />))
                }
            </Content>
        </Container>
    );
}

export default List;