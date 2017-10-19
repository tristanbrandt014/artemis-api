// @flow
import gql from "./../../utils/gql"

export const Mutation = gql`
    input StartupInput {
        type: String!,
        value: String
    }
    input SettingsInput {
        startup: StartupInput
    }
    extend type Mutation {
        # Update user settings
        updateUserSettings(settings: SettingsInput): User
    }
`

Mutation.updateUserSettings = (root, params, context) => {
    return context.handlers.User.updateSettings(context.id)(params)
}