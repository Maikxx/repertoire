import { GraphQLNonNull } from 'graphql'
import { CountryInputTypeInterface } from '../../types/Country'
import { CreateCountry } from '../../domains/Country/CreateCountryService'
import { CountryType, CountryInputType } from './Country.type'

export interface CreateCountryArgs {
    country: CountryInputTypeInterface
}

export const createCountry = () => ({
    type: CountryType,
    description: 'Create a country on database',
    args: {
        country: {
            type: new GraphQLNonNull(CountryInputType),
            description: 'The input type required to create a country',
            required: true,
        },
    },
    resolve: (_, args: CreateCountryArgs) => {
        return CreateCountry(args)
    },
})
