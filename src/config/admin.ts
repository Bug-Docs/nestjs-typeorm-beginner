import { AdminModule } from '@adminjs/nestjs'
import * as AdminJSTypeorm from '@adminjs/typeorm'
import adminjs from 'adminjs'
import { User } from 'src/users/entities/user.entity';
const DEFAULT_ADMIN = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
}

adminjs.registerAdapter({
    Resource: AdminJSTypeorm.Resource,
    Database: AdminJSTypeorm.Database
});

const authenticate = async (email: string, password: string) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN)
    }
    return null
}

export default AdminModule.createAdminAsync({
    useFactory: () => ({
        adminJsOptions: {
            rootPath: '/admin',
            resources: [
                {
                    resource: User,
                    options: {
                        navigation: {
                            icon: 'Fire',
                            name: 'Utilities'
                        },
                    }
                }
            ],
        },
        auth: {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: 'secret'
        },
        sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: 'secret'
        },
    }),
})