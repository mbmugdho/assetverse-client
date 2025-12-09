import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Users, Briefcase, Cake } from 'lucide-react'
import { useMyAffiliations } from '../../../hooks/useMyAffiliations'
import { useCompanyTeam } from '../../../hooks/useCompanyTeam'

const getMonthName = (date) => date.toLocaleString('default', { month: 'long' })

const EmployeeMyTeam = () => {
  const {
    data: affiliations,
    isLoading: affLoading,
    isError: affError,
    error: affErr,
  } = useMyAffiliations()
  const myAffiliations = affiliations || []

  const [selectedHrEmail, setSelectedHrEmail] = useState(
    myAffiliations[0]?.hrEmail || ''
  )

  const {
    data: teamMembers,
    isLoading: teamLoading,
    isError: teamError,
    error: teamErr,
  } = useCompanyTeam(selectedHrEmail)

  const selectedAffiliation = useMemo(() => {
    return (
      myAffiliations.find((a) => a.hrEmail === selectedHrEmail) ||
      myAffiliations[0]
    )
  }, [myAffiliations, selectedHrEmail])

  const currentMonth = new Date().getMonth()

  const upcomingBirthdays =
    (teamMembers || []).filter((member) => {
      if (!member.dateOfBirth) return false
      const dob = new Date(member.dateOfBirth)
      return dob.getMonth() === currentMonth
    }) || []

  const handleSelectCompany = (hrEmail) => {
    setSelectedHrEmail(hrEmail)
  }

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
        {affLoading && (
          <p className="text-sm text-base-content/70">
            Loading affiliations...
          </p>
        )}
        {affError && (
          <p className="text-sm text-error">
            Failed to load affiliations: {affErr?.message || 'Unknown error'}
          </p>
        )}
        {!affLoading && !affError && myAffiliations.length === 0 && (
          <p className="text-sm text-base-content/70">
            You are not affiliated with any company yet. Submit an asset request
            to get started.
          </p>
        )}
        {!affLoading && !affError && myAffiliations.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-brand-main" />
              <span className="text-xs text-base-content/70">
                Select a company:
              </span>
            </div>
            <div className="tabs tabs-boxed bg-base-200/60">
              {myAffiliations.map((aff) => (
                <button
                  key={aff._id}
                  type="button"
                  onClick={() => handleSelectCompany(aff.hrEmail)}
                  className={`tab text-xs md:text-sm ${
                    aff.hrEmail === selectedHrEmail
                      ? 'tab-active text-brand-deep'
                      : 'text-base-content/70'
                  }`}
                >
                  {aff.companyName}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main content: colleagues + birthdays */}
      {myAffiliations.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-5">
          {/* Colleagues */}
          <div className="card-glass-brand p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-brand-main" />
              <h3 className="text-sm font-semibold text-brand-deep">
                Colleagues at {selectedAffiliation?.companyName}
              </h3>
            </div>
            {teamLoading && (
              <p className="text-xs text-base-content/70">Loading team...</p>
            )}
            {teamError && (
              <p className="text-xs text-error">
                Failed to load team: {teamErr?.message || 'Unknown error'}
              </p>
            )}
            {!teamLoading &&
              !teamError &&
              (!teamMembers || teamMembers.length === 0) && (
                <p className="text-xs text-base-content/70">
                  No colleagues found for this company.
                </p>
              )}
            {!teamLoading &&
              !teamError &&
              teamMembers &&
              teamMembers.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {teamMembers.map((colleague) => (
                    <div
                      key={colleague._id}
                      className="border border-base-200 rounded-xl p-3 flex gap-3 items-center bg-base-100/80"
                    >
                      <div className="avatar">
                        <div className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center text-xs font-semibold text-brand-main">
                          {
                            (colleague.employeeName ||
                              colleague.employeeEmail)[0]
                          }
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-semibold text-brand-deep">
                          {colleague.employeeName || colleague.employeeEmail}
                        </p>
                        <p className="text-[11px] text-base-content/70">
                          {colleague.employeeEmail}
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
                Upcoming birthdays in {getMonthName(new Date())}
              </h3>
            </div>
            {teamLoading && (
              <p className="text-xs text-base-content/70">
                Loading birthdays...
              </p>
            )}
            {!teamLoading && upcomingBirthdays.length === 0 && (
              <p className="text-xs text-base-content/70">
                No upcoming birthdays this month.
              </p>
            )}
            {!teamLoading && upcomingBirthdays.length > 0 && (
              <ul className="space-y-2">
                {upcomingBirthdays.map((person) => (
                  <li
                    key={person._id}
                    className="flex items-center justify-between gap-2 border border-base-200 rounded-xl px-3 py-2 bg-base-100/80"
                  >
                    <div className="flex items-center gap-2">
                      <div className="avatar">
                        <div className="w-8 h-8 rounded-full bg-base-200 flex items-center justify-center text-[11px] font-semibold text-brand-main">
                          {(person.employeeName || person.employeeEmail)[0]}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-brand-deep">
                          {person.employeeName || person.employeeEmail}
                        </p>
                        <p className="text-[11px] text-base-content/60">
                          {selectedAffiliation?.companyName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-base-content/70">
                      <p className="font-semibold">
                        {person.dateOfBirth
                          ? new Date(person.dateOfBirth).toLocaleDateString()
                          : '—'}
                      </p>
                      <p>Birthday</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default EmployeeMyTeam
