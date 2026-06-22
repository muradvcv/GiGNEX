import { ArrowRight, BadgeCheck, BriefcaseBusiness, DollarSign, FileText, MessageSquareText, UserRoundCheck, Users } from "lucide-react";

export default function How() {
  const steps = [
    {
      id: "1",
      title: "Post a Task",
      description: "Describe what you need done in minutes.",
      icon: FileText,
    },
    {
      id: "2",
      title: "Get Proposals",
      description: "Receive proposals from skilled freelancers.",
      icon: MessageSquareText,
    },
    {
      id: "3",
      title: "Hire & Pay",
      description: "Choose the best freelancer and pay securely.",
      icon: UserRoundCheck,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          How It Works
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="flex items-center w-full"
              >
                <div className="group flex-1">
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-violet-300 cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-violet-100 flex items-center justify-center transition-all duration-300 group-hover:bg-violet-600">
                        <Icon className="w-7 h-7 text-violet-600 group-hover:text-white" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {step.id}. {step.title}
                        </h3>

                        <p className="text-gray-500 mt-2">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:flex px-6">
                    <ArrowRight className="w-6 h-6 text-gray-400 transition-transform duration-300 hover:translate-x-2" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
       
      
      </div>
    </section>
  );
}