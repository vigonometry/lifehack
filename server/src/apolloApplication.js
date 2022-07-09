import { createApplication } from "graphql-modules";
import { ClientModule } from "../types/Client.js";
import { CounsellorModule } from "../types/Counsellor.js"
import { ChatModule } from "../types/Chat.js"
import { UserModule } from "../types/User.js"
import { HTTPResponseModule } from "../types/HTTPResponse.js"
import { PubSub } from "graphql-subscriptions";

export const apolloApplication = createApplication({
	modules: [
		ClientModule,
		CounsellorModule,
		ChatModule,
		UserModule,
		HTTPResponseModule,
	],
	providers: [
		{
			provide: PubSub,
			useValue: new PubSub()
		}
	]
});

//const subscribe = apolloApplication.createSubscription();