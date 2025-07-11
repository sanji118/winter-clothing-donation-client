import { useQuery } from '@tanstack/react-query'
import FaqBanner from '../../../public/pageBanners/faq-banner.png'
import PageBanner from '../../components/ui/PageBanner'
import { getFAQs } from '../../services/faqService'
import SectionSubHeading from '../../components/ui/SectionSubHeading'
import SectionHeading from '../../components/ui/SectionHeading'
import { ErrorState } from '../../components/ui/ErrorState'
import { LoadingState } from '../../components/ui/LoadingState'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import faq from '../../assets/images/faq.gif'

const Faq = () => {
  const {data: faqs = [], isLoading, isError} = useQuery({
    queryKey: ['faq'],
    queryFn: getFAQs
  })
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  if(isLoading) return <LoadingState name={'FAQs'} />
  if(isError) return <ErrorState name={'FAQs'} />

  return (
    <div>
      <PageBanner image={FaqBanner} title={'FAQs'} />
      <div className='p-5 md:p-20'>
        <div>
          <SectionSubHeading text={'Frequently Asked Questions'} />
          <SectionHeading text={'Have Any Question For Us?'} />
          <p className='opacity-80 max-w-3xl'>Join us in creating lasting change. Our corporate partnership program enables businesses to support impactful initiatives while enhancing brand visibility and meeting CSR commitments.</p>
        </div>

        <div className="my-10 mx-auto p-8 rounded-2xl shadow-md bg-gradient-to-r from-[#f8f5ed] to-[#e8f4f4]">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Have any Question</h1>
          <form>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full mb-4 px-5 py-3 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1b9e9c]"
            />
            <textarea
              name="message"
              placeholder="Write Message..."
              rows="5"
              className="w-full mb-6 px-5 py-3 rounded-2xl bg-white text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#1b9e9c]"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#2bcbc9] to-[#1b9e9c] text-white font-semibold hover:opacity-90 transition-all shadow-md"
            >
              Ask Question Now
            </button>
          </form>
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mx-auto w-fit mb-12 text-amber-400 flex items-center gap-4">
            Common Questions <img src={faq} alt="" className='w-12'/>
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={faq._id} 
                className="rounded-xl overflow-hidden shadow-sm border border-gray-100"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`w-full flex justify-between items-center p-6 text-left transition-all ${activeIndex === index ? 'bg-[#f0f7f7]' : 'bg-white hover:bg-gray-50'}`}
                >
                  <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                  {activeIndex === index ? (
                    <FiChevronUp className="text-[#1b9e9c] text-xl" />
                  ) : (
                    <FiChevronDown className="text-gray-400 text-xl" />
                  )}
                </button>
                
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-gray-600 bg-white">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Faq