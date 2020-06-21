---
title: Call for sponsors
---

# Call for sponsors

The international conference **PUBMET2020: The 7th Conference on Scholarly Publishing and Communication in the Context of Open Science** will be held on **September 16-18, 2020 at the University of Zadar, Croatia**. PUBMET2020 is organised by the University of Zadar, Department of Information Sciences, Croatian Association for Scholarly Communication, University of Zagreb, Faculty of Food Technology and Biotechnology, and Ruđer Bošković Institute in Zagreb. By supporting the conference, sponsors will have the opportunity to present their products to the wide audience, from researchers, university professors, publishers, editors, librarians, information and communication experts to policymakers. In the focus of the conference are scholarly communication (and **pub**lishing as the most visible channel) and **met**rics. These year's conference topics will focus on:

  - open scholarship (open access to publications and research data, open educational materials, open peer review)

  - digital OA repositories (including next generation repositories), European Open Research Cloud

  - personal data protection, copyright and licencing

  - research assessment (bibliometrics, altmetrics, next generation metrics)

  - digital scholarly publishing (interactive digital publications, multimedia content, semantics, identifiers)

  - editorial practice and ethical questions (editorial policy, standards of editorial work, plagiarism detection, peer-review process, authorship and contributorship)

  - scientific communication (peer-to peer, general public, communicating science to policymakers)

  - ethical issues in science (conflict of interest, human and animal research protection, gender equality)

All themes will be presented by invited speakers, shorter presentations by registered speakers, as well as in workshops, poster session and a panel discussion.

PUBMET2020 offers sponsorship opportunities at four different levels: Platinum (1500 € or more), Gold (1000 € or more), Silver (600 € or more) and Bronze (300 € or more). Other forms of sponsoring are very welcomed as well, including conference T-shirts or items in the welcome pack for delegates (e.g. bags, mugs, badges, USB sticks, bookmarks, pads of paper and pens). Any other type of support you find more appropriate to your promotional strategy can, of course, be discussed with the Organizing Committee.

This year we are once again offering an additional form of participation for sponsors via a panel discussion on future of scientific publishing. You are also welcome to suggest topic of your interest that might be included in the panel discussion. All registered participants can join in the discussion so this would be an opportunity for the sponsors to interact with the audience of the Conference and exchange ideas and experiences.

There is a clear marketing opportunity for sponsors' promotion to all PUBMET2020 attendees. The last year's PUBMET conference attracted 130 participants from 11 countries (Belgium, Brasil, Croatia, Finland, France, the Netherlands, Russia, Slovenia, Turkey, UK and USA). Depending on the sponsorship level, a number of benefits are offered, including complimentary full-conference registrations, link to the sponsor's website on the conference website, a table in the main conference area with an internet connection, slot for a poster during the entire conference, sponsor's logo on the conference website and press material, as well as on the program guide and Book of abstracts. Sponsors can also take part in the sponsor's block, giving short lectures or just presenting their products. Details are given in the following table:

<div class="overflow-x-auto">
  <table>
    <thead>
      <tr>
        <th class="text-left align-bottom">
          Sponsorship opportunities and benefits
        </th>
        <each loop="group in sponsors.groups">
          <th class="whitespace-no-wrap px-3">
            {{ group.name }}<br />
            ≥ {{ group.paymentAmount }}
          </th>
        </each>
      </tr>
    </thead>
    <tbody>
      <each loop="row in sponsors.opportunities">
        <tr>
          <each loop="data, index in row.content">
            <td class="{{ index === 0  ? 'text-left' : 'text-center' }}" style="{{ index === 0 ? `min-width: 20rem;` : '' }}">
              <switch expression="data">
                <case n="true">
                  <icon id="checkmark" class="s-1 inline-block text-green-600" role="img" aria-label="yes"></icon>
                </case>
                <case n="false">
                  <span class="text-gray-500">—</span>
                </case>
                <default>
                  {{ data }}
                </default>
              </switch>
            </td>
          </each>
        </tr>
      </each>
    </tbody>
  </table>
</div>

For more information about sponsorship opportunities please contact Jelena Viličić at <jvilicic@pbf.hr>.
