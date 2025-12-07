import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Briefcase, Cake } from 'lucide-react'

// Fake affiliations & colleagues for UI
const mockCompanies = [
  {
    id: 'c1',
    name: 'GreenFrame Studio',
    role: 'Product Designer',
    colleagues: [
      {
        id: 'e1',
        name: 'Maya Chen',
        email: 'maya@greenframe.io',
        position: 'Product Manager',
        avatar: 'https://i.pravatar.cc/100?img=1',
        birthday: 'Feb 10',
        upcoming: true,
      },
      {
        id: 'e2',
        name: 'Daniel Lee',
        email: 'daniel@greenframe.io',
        position: 'Frontend Engineer',
        avatar: 'https://i.pravatar.cc/100?img=2',
        birthday: 'Mar 02',
        upcoming: false,
      },
    ],
  },
  {
    id: 'c2',
    name: 'CloudNest Labs',
    role: 'Consultant',
    colleagues: [
      {
        id: 'e3',
        name: 'Sarah Ahmed',
        email: 'sarah@cloudnest.dev',
        position: 'HR Manager',
        avatar: 'https://i.pravatar.cc/100?img=3',
        birthday: 'Feb 25',
        upcoming: true,
      },
    ],
  },
]

const EmployeeMyTeam = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState(
    mockCompanies[0]?.id
  )

  const selectedCompany =
    mockCompanies.find((c) => c.id === selectedCompanyId) || mockCompanies[0]

  const upcomingBirthdays =
    selectedCompany?.colleagues.filter((c) => c.upcoming) || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-brand-deep">My Team</h2>
          <p className="text-sm text-base-content/70">
            View your colleagues and upcoming birthdays for each company you
            work with.
          </p>
        </div>
      </div>

      {/* Company selector */}
      <div className="card-glass-brand p-3 md:p-4">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-brand-main" />
            <span className="text-xs text-base-content/70">
              Select a company:
            </span>
          </div>
          <div className="tabs tabs-boxed bg-base-200/60">
            {mockCompanies.map((company) => (
              <button
                key={company.id}
                type="button"
                onClick={() => setSelectedCompanyId(company.id)}
                className={`tab text-xs md:text-sm ${
                  company.id === selectedCompanyId
                    ? 'tab-active text-brand-deep'
                    : 'text-base-content/70'
                }`}
              >
                {company.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content: colleagues + birthdays */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-5">
        {/* Colleagues */}
        <div className="card-glass-brand p-4">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-brand-main" />
            <h3 className="text-sm font-semibold text-brand-deep">
              Colleagues at {selectedCompany?.name}
            </h3>
          </div>
          {selectedCompany?.colleagues.length === 0 ? (
            <p className="text-xs text-base-content/70">
              No colleagues found for this company.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedCompany.colleagues.map((colleague) => (
                <div
                  key={colleague.id}
                  className="border border-base-200 rounded-xl p-3 flex gap-3 items-center bg-base-100/80"
                >
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full">
                      <img src={colleague.avatar} alt={colleague.name} />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-brand-deep">
                      {colleague.name}
                    </p>
                    <p className="text-[11px] text-base-content/60">
                      {colleague.position}
                    </p>
                    <p className="text-[11px] text-base-content/70">
                      {colleague.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming birthdays */}
        <div className="card-glass-brand p-4">
          <div className="flex items-center gap-2 mb-3">
            <Cake className="w-4 h-4 text-brand-main" />
            <h3 className="text-sm font-semibold text-brand-deep">
              Upcoming birthdays
            </h3>
          </div>
          {upcomingBirthdays.length === 0 ? (
            <p className="text-xs text-base-content/70">
              No upcoming birthdays this month.
            </p>
          ) : (
            <ul className="space-y-2">
              {upcomingBirthdays.map((person) => (
                <li
                  key={person.id}
                  className="flex items-center justify-between gap-2 border border-base-200 rounded-xl px-3 py-2 bg-base-100/80"
                >
                  <div className="flex items-center gap-2">
                    <div className="avatar">
                      <div className="w-8 h-8 rounded-full">
                        <img src={person.avatar} alt={person.name} />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-brand-deep">
                        {person.name}
                      </p>
                      <p className="text-[11px] text-base-content/60">
                        {selectedCompany?.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-base-content/70">
                    <p className="font-semibold">{person.birthday}</p>
                    <p>Birthday</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default EmployeeMyTeam
