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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const formVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2
      }
    }
  }

  return (
    <div>
      <PageBanner image={FaqBanner} title={'FAQs'} />
      <div className='p-5 md:p-20'>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <SectionSubHeading text={'Frequently Asked Questions'} />
            <SectionHeading text={'Have Any Question For Us?'} />
            <p className='opacity-80 max-w-3xl'>Join us in creating lasting change. Our corporate partnership program enables businesses to support impactful initiatives while enhancing brand visibility and meeting CSR commitments.</p>
          </motion.div>

          <motion.div 
            className="my-10 mx-auto p-8 rounded-2xl shadow-md bg-gradient-to-r from-[#f8f5ed] to-[#e8f4f4]"
            variants={formVariants}
            whileHover={{ scale: 1.01 }}
          >
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Have any Question</h1>
            <form>
              <motion.input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full mb-4 px-5 py-3 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1b9e9c]"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.textarea
                name="message"
                placeholder="Write Message..."
                rows="5"
                className="w-full mb-6 px-5 py-3 rounded-2xl bg-white text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#1b9e9c]"
                whileFocus={{ scale: 1.02 }}
              ></motion.textarea>
              <motion.button
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#2bcbc9] to-[#1b9e9c] text-white font-semibold hover:opacity-90 transition-all shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ask Question Now
              </motion.button>
            </form>
          </motion.div>

          <motion.div 
            className="mt-20 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-3xl font-bold mx-auto w-fit mb-12 text-amber-400 flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Common Questions <motion.img 
                src={faq} 
                alt="" 
                className='w-12'
                initial={{ rotate: -20 }}
                animate={{ rotate: 20 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 1 
                }}
              />
            </motion.h2>
            
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {faqs.map((faq, index) => (
                <motion.div 
                  key={faq._id} 
                  className="rounded-xl overflow-hidden shadow-sm border border-gray-100"
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
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
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Faq