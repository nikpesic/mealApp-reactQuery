import React, { useState, useEffect } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import { MealItem } from './MealItem/MealItem';
import { useQuery, UseQueryResult } from 'react-query';
import { Spinner } from '../UI/Spinner';
import axios from 'axios';

export type MealObj = {
  id: string;
  name: string;
  description: string;
  price: number;
  key?: string;
};

const fetchMeals = async () => {
  const response = await axios.get<MealObj[]>(
    'https://mealapp-typescript-b3c22-default-rtdb.firebaseio.com/meals.json'
  );
  return await response.data;
};

export const AvailableMeals: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery<MealObj[], Error>(
    ['meal'],
    fetchMeals,
    {
      select: (data) => {
        return Object.keys(data).map((key: any) => {
          return {
            id: key,
            description: data[key].description,
            name: data[key].name,
            price: data[key].price,
          };
        });
      },
    }
  );

  const mealsList = data?.map((meal: MealObj) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      id={meal.id}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (isLoading) {
    return (
      <section className={classes['meals-loading']}>
        <div>
          <Spinner />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={classes.mealsError}>
        <h2>Something went wrong!!! Error is -- {error?.message}</h2>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

// const fetchMeals = async () => {
//   const response = await fetch(
//     'https://mealapp-835ab-default-rtdb.firebaseio.com/meals.json'
//   );
//   if (!response.ok) {
//     throw new Error('Something went wrong');
//   }
//   const responseData = await response.json();
//   return responseData;
// };
