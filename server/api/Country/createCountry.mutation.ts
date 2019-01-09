import { GraphQLNonNull } from 'graphql'
import { CountryInputTypeInterface } from '../../types/Country'
import { CreateCountry } from '../../domains/Country/CreateCountryService'
import { CountryType, CountryInputType } from './Country.type'

export interface CreateCountryArgs {
    country: CountryInputTypeInterface
}

export const createCountry = () => ({
    type: CountryType,
    args: {
        country: {
            type: new GraphQLNonNull(CountryInputType),
            required: true,
        },
    },
    resolve: (_, args: CreateCountryArgs) => CreateCountry(args),
})
