import React from "react";

export default function ServiceContentTable() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            सेवा प्रदानकर्ताहरूको सम्पर्क विवरण
          </span>
        </h2>

        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gradient-to-r from-blue-900/60 to-cyan-900/60">
                <th className="px-6 py-4 font-semibold text-gray-200 border-r border-gray-700 w-20">
                  ना.
                </th>
                <th className="px-6 py-4 font-semibold text-gray-200 border-r border-gray-700">
                  सेवाको प्रकारहरु
                </th>
                <th className="px-6 py-4 font-semibold text-gray-200 border-r border-gray-700">
                  कहाँ सम्पर्क गर्ने
                </th>
                <th className="px-6 py-4 font-semibold text-gray-200">
                  कसरी सम्पर्क गर्ने
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="hover:bg-gray-800/70 transition-colors duration-200">
                <td className="px-6 py-4 border-t border-gray-700 font-semibold text-blue-400 text-center">
                  १
                </td>
                <td className="px-6 py-4 border-t border-gray-700 text-gray-300">
                  महिला र बालबालिकाहरु विरुद्ध कुनै पनि हिंसा भएमा
                </td>
                <td className="px-6 py-4 border-t border-gray-700 text-gray-300">
                  राष्ट्रिय महिला आयोग
                </td>
                <td className="px-6 py-4 border-t border-gray-700 font-medium text-cyan-400">
                  ११४५ / 1145
                </td>
              </tr>

              <tr className="hover:bg-gray-800/70 transition-colors duration-200 bg-gray-800/30">
                <td className="px-6 py-4 border-t border-gray-700 font-semibold text-blue-400 text-center">
                  २
                </td>
                <td className="px-6 py-4 border-t border-gray-700 text-gray-300">
                  यदि बालबालिकामाथि कुनै पनि शारीरिक, यौन वा भावनात्मक हिंसा
                  भएमा
                </td>
                <td className="px-6 py-4 border-t border-gray-700 text-gray-300">
                  बाल हेल्प लाइन
                </td>
                <td className="px-6 py-4 border-t border-gray-700 font-medium text-cyan-400">
                  १०९८ / 1098
                </td>
              </tr>

              <tr className="hover:bg-gray-800/70 transition-colors duration-200">
                <td className="px-6 py-4 border-t border-gray-700 font-semibold text-blue-400 text-center">
                  ३
                </td>
                <td className="px-6 py-4 border-t border-gray-700 text-gray-300">
                  बालबालिका हराएमा तथा भेटिएमा
                </td>
                <td className="px-6 py-4 border-t border-gray-700 text-gray-300">
                  बालबालिका खोजतलास समन्वय केन्द्र
                </td>
                <td className="px-6 py-4 border-t border-gray-700 font-medium text-cyan-400">
                  १०४ / 104
                </td>
              </tr>

              <tr className="hover:bg-gray-800/70 transition-colors duration-200 bg-gray-800/30">
                <td className="px-6 py-4 border-t border-gray-700 font-semibold text-blue-400 text-center">
                  ४
                </td>
                <td className="px-6 py-4 border-t border-gray-700 text-gray-300">
                  मानव तस्करी, मानिस हराएको वा अन्य यौन तथा लैङ्गिक हिंसा भएमा
                </td>
                <td className="px-6 py-4 border-t border-gray-700 text-gray-300">
                  नेपाल प्रहरी
                </td>
                <td className="px-6 py-4 border-t border-gray-700 font-medium text-cyan-400">
                  १०० / 100
                </td>
              </tr>

              <tr className="hover:bg-gray-800/70 transition-colors duration-200">
                <td className="px-6 py-4 border-t border-gray-700 font-semibold text-blue-400 text-center">
                  ५
                </td>
                <td className="px-6 py-4 border-t border-gray-700 text-gray-300">
                  मनोवैज्ञानिक र मनोसामाजिक सेवाहरु र परामर्श
                </td>
                <td className="px-6 py-4 border-t border-gray-700 text-gray-300">
                  टी.पी.ओ. नेपाल
                </td>
                <td className="px-6 py-4 border-t border-gray-700 font-medium text-cyan-400">
                  १६६००१०२००५ / 1660 010 2005
                </td>
              </tr>

              <tr className="hover:bg-gray-800/70 transition-colors duration-200 bg-gray-800/30">
                <td className="px-6 py-4 border-t border-gray-700 font-semibold text-blue-400 text-center">
                  ६
                </td>
                <td className="px-6 py-4 border-t border-gray-700 text-gray-300">
                  स्वास्थ्य सम्बन्धी जिज्ञासा भएमा
                </td>
                <td className="px-6 py-4 border-t border-gray-700 text-gray-300">
                  स्वास्थ्य तथा जनसङ्ख्या मन्त्रालय
                </td>
                <td className="px-6 py-4 border-t border-gray-700 font-medium text-cyan-400">
                  १११५ / 1115
                </td>
              </tr>

              <tr className="hover:bg-gray-800/70 transition-colors duration-200">
                <td className="px-6 py-4 border-t border-gray-700 font-semibold text-blue-400 text-center">
                  ७
                </td>
                <td className="px-6 py-4 border-t border-gray-700 text-gray-300">
                  बाढी र मौसम पूर्वानुमान सम्बन्धी जिज्ञासा भएमा
                </td>
                <td className="px-6 py-4 border-t border-gray-700 text-gray-300">
                  जल तथा मौसम विज्ञान विभाग
                </td>
                <td className="px-6 py-4 border-t border-gray-700 font-medium text-cyan-400">
                  ११५५ / 1155
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            <span className="text-cyan-400">Note:</span> These are official
            helpline numbers for Nepal
          </p>
        </div>
      </div>
    </div>
  );
}
