"use client"

import { useState } from "react"
import RegistrationForm from "./RegistrationForm"
import SuccessModal from "./SuccessModal"

export default function RegistrationSection() {
  const [modalData, setModalData] = useState<{ link: string | null; name?: string } | null>(null)

  function handleSuccess(zaloLink: string, zaloGroupName?: string) {
    setModalData({ link: zaloLink, name: zaloGroupName })
  }

  return (
    <>
      <section id="register" className="py-20">
        <div className="section-container max-w-xl">
          <div className="card p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {"Đ"}{"ã"}ng K{"ý"} <span className="gradient-text">Ngay</span>
            </h2>
            <p className="text-gray-400 mb-8">
              Tham gia c{"ộ"}ng {"đ"}{"ồ"}ng 500+ h{"ọ"}c vi{"ên"} {"đ"}ang t{"ạ"}o video b{"ằ"}ng AI
            </p>
            <RegistrationForm onSuccess={handleSuccess} />
          </div>
        </div>
      </section>

      {modalData && (
        <SuccessModal
          zaloLink={modalData.link}
          zaloGroupName={modalData.name}
          onClose={() => setModalData(null)}
        />
      )}
    </>
  )
}