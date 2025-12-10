const faqs = [
  {
    question: 'Is AssetVerse free for small teams?',
    answer:
      'Yes. The Basic package includes up to 5 employees per company, ideal for early-stage teams and pilots.',
  },
  {
    question: 'Can employees be part of multiple companies?',
    answer:
      'Absolutely. Employees can have multiple active affiliations and see all their assets across companies in one view.',
  },
  {
    question: 'What happens when we hit our employee limit?',
    answer:
      'HR will be prompted to upgrade to a higher package via Stripe before approving more employees.',
  },
  {
    question: 'Do you support asset returns and condition tracking?',
    answer:
      'Yes. Returnable assets can be checked back in, and the system can be extended with damage or condition notes.',
  },
]

const FAQSection = () => {
  return (
    <section className="py-16 md:py-20 ">
      <div className="container-x grid grid-cols-1 md:grid-cols-[1.1fr,1.4fr] gap-10 items-start">
        <div>
          <p className="text-s uppercase tracking-[0.18em] text-brand-main font-semibold">
            FAQ
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-deep mt-2 mb-3">
            Answers to questions HR teams actually ask.
          </h2>
          <p className="text-sm md:text-base text-base-content/80">
            From implementation to permissions and payments, AssetVerse is
            designed to match how modern distributed companies really work.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map(item => (
            <div
              key={item.question}
              className="collapse collapse-arrow bg-base-100/60 shadow-sm border border-base-200 rounded-4xl"
            >
              <input type="checkbox" />
              <div className="collapse-title text-sm md:text-base font-semibold text-brand-deep">
                {item.question}
              </div>
              <div className="collapse-content text-xs md:text-sm text-base-content/75 leading-relaxed">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection