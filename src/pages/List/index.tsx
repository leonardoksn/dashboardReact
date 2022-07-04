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
import listOfMounths from '../../utils/months'
import { v4 as uuidv4 } from "uuid";
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
        if (type === 'entry-balance') {
            return gains;
        }
        else if (type === 'exit-balance') {
            return expenses;
        } else
            return gains;
    }, [type]);


    const months = useMemo(() => {
        return listOfMounths.map((month, index) => {
            return {
                value: index + 1,
                label: month
            }
        });
    }, []);

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        listData.forEach(item => {
            const data = new Date(item.date);

            const year = data.getFullYear();
            if (!uniqueYears.includes(year)) {
                uniqueYears.push(year)
            }
        });
        return uniqueYears.map(year => {
            return {
                value: year,
                label: year
            }
        })
    }, [listData]);

    const handleFrequencyClick = (frequency: string) => {
        
    }


    useEffect(() => {

        const filtredData = listData.filter(item => {
            const date = new Date(item.date);

            const month = String(date.getMonth() + 1);
            const year = String(date.getFullYear());

            return yearSelected === year && month === mouthSelected;
        });

        const response = filtredData.map(item => {

            return {
                // id: String(Math.floor(Math.random() * 9999)),
                id: uuidv4(),
                description: item.description,
                amountFormated: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dataFormatted: formatDate(item.date),
                tagColor: item.frequency === 'eventual' ? '#E44C4E' : '#4E41F0'
            }
        })

        setData(response);
    }, [listData, mouthSelected, yearSelected, data.length]);
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
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>

                <button
                    type="button"
                    className='tag-filter tag-filter-eventual'
                    onClick={() => handleFrequencyClick('eventual')}
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