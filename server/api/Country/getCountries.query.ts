import { GraphQLList } from 'graphql'
import { CountryType } from './Country.type'
import { GetCountries } from '../../domains/Country/GetCountriesService'

export const getCountries = () => ({
    type: new GraphQLList(CountryType),
    resolve: () => GetCountries(),
})
