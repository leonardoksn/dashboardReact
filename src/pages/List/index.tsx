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
    const [daySelected, setDaySelected] = useState<string>(String(new Date().getDate() + 1));
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

    const days = [
        { value: 0, label: 'Todos' },
    ];

    for (let i = 1; i < 31; i++) {
        days.push({ value: i, label: String(i) })
    }


    const months = [
        { value: 0, label: 'Todos' },
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
        { value: 0, label: 'Todos' },
        { value: 2022, label: 2022 },
        { value: 2021, label: 2021 },
        { value: 2020, label: 2020 },
    ];

    useEffect(() => {

        const filtredData = listData.filter(item => {
            const date = new Date(item.date);
            const day = String(date.getDate() + 1)
            const mouth = String(date.getMonth() + 1);
            const year = String(date.getFullYear());

            if (Number(mouthSelected) === 0 && Number(daySelected) !== 0 && Number(yearSelected) !== 0)
                return day === daySelected && year === yearSelected;
            else if (Number(daySelected) === 0 && Number(mouthSelected) !== 0 && Number(yearSelected) !== 0)
                return mouth === mouthSelected && year === yearSelected;
            else if (Number(mouthSelected) !== 0 && Number(yearSelected) === 0 && Number(daySelected) === 0)
                return mouth === mouthSelected;
            else if (Number(mouthSelected) !== 0 && Number(yearSelected) === 0 && Number(daySelected) !== 0)
                return mouth === mouthSelected && day === daySelected;
            else if (Number(mouthSelected) === 0 && Number(yearSelected) === 0 && Number(daySelected) !== 0)
                return day === daySelected;
            else if (Number(daySelected) === 0 && Number(mouthSelected) === 0 && Number(yearSelected) !== 0)
                return year === yearSelected;
            else if (Number(daySelected) === 0 && Number(mouthSelected) === 0 && Number(yearSelected) === 0)
                return listData;
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
    }, [listData, daySelected, mouthSelected, yearSelected, data.length]);
    return (
        <Container>
            <ContentHeader title={title.title} lineColor={title.lineColor}>
                <SelectInput options={days} onChange={(e) => setDaySelected(e.target.value)} defaultValue={daySelected} />
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