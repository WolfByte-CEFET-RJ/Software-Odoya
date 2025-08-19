import { useContext, useEffect, useState } from "react";
import api from "../../api.js";
import Header from "../../components/Header/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import "./Newsletter.scss";
import { toast } from "react-toastify";
import { MdDelete, MdDocumentScanner, MdWarning } from "react-icons/md";
import { BiFolderOpen, BiFolderPlus } from "react-icons/bi";
import { UserContext } from "../../components/Context/userContext.jsx";
import { FaTimes } from "react-icons/fa";
import ModalConfirmation from "../../components/ModalConfirmation/index.jsx";
import { useConfirmation } from "../../components/ModalConfirmation/handleHook.jsx";

const MAX_SUMMARY_LENGTH = 150; // limite de caracteres por sumário
const MONTHS_PER_PAGE = 6; // quantidade de meses por página

const MONTHS_PT_BR = {
  janeiro: 0,
  fevereiro: 1,
  março: 2,
  abril: 3,
  maio: 4,
  junho: 5,
  julho: 6,
  agosto: 7,
  setembro: 8,
  outubro: 9,
  novembro: 10,
  dezembro: 11,
};

const NewsPage = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [page, setPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");

  const { admin } = useContext(UserContext);

  const {confirm, ConfirmationModal} = useConfirmation()
  

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get("/newsletter");
        setNewsletters(response.data.newsletter || []);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };
    fetchNews();
  }, []);

  // Agrupar newsletters por mês/ano
  const groupByMonth = (items) => {
    return items.reduce((groups, item) => {
      const date = new Date(item.date);
      const monthYear = date.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
      });
      if (!groups[monthYear]) groups[monthYear] = [];
      groups[monthYear].push(item);
      return groups;
    }, {});
  };

  const groupedNews = groupByMonth(newsletters);

  // Ordenar meses do mais recente para o mais antigo
  const orderedMonths = Object.keys(groupedNews)
    .map((monthStr) => {
      const [monthName, year] = monthStr.split(" de ");
      const monthIndex = MONTHS_PT_BR[monthName.toLowerCase()];
      return { monthStr, date: new Date(Number(year), monthIndex) };
    })
    .sort((a, b) => b.date - a.date)
    .map((m) => m.monthStr);

  // Paginar meses
  const paginatedMonths = orderedMonths.slice(
    page * MONTHS_PER_PAGE,
    (page + 1) * MONTHS_PER_PAGE
  );

  // Alternar expandir/contrair resumo
  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Criar newsletter
  const handleAddNews = async () => {
    if (!file) {
      toast.error("Selecione um arquivo");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("newsletter", file);
      formData.append("newsData", JSON.stringify({ summary }));

      await api.post("/newsletter", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Newsletter criada com sucesso!");
      window.location.reload()
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

    const handleDeleteNews = async (id) => {
        if (! (await confirm("deletar para sempre esta newsletter?"))) return;

        try {
            await api.delete(`/newsletter/${id}`);
            toast.success("Newsletter deletada com sucesso!");
            
            window.location.reload()

        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
        };


  return (
    <>
      <Header />

      <section className="welcome-section">
        <h1 className="welcome-titulo">Portal de Notícias</h1>
      </section>

      <img src="./Ondinhas.svg" className="separador" alt="Separador" />

      {admin && (
        <div className="add">
          <button
            onClick={() => setModalOpen(true)}
            className="add-btn"
            title="Adicionar newsletter"
          >
            Postar Newsletter
          </button>
        </div>
      )}

      {/* Modal de criação */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>            
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Nova Newsletter</h2>
            <p style={{color: "yellowgreen"}}>

                <MdWarning/> São permitidas apenas 2 postagens por mês. 
            </p>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <textarea
              placeholder="Sumário da newsletter"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={() => setModalOpen(false)}>Cancelar</button>
              <button className="save-btn" onClick={handleAddNews}>Salvar</button>
            </div>
          </div>
        </div>
      )}

      {newsletters.length > 0 ? (
        <section className="news">
          {paginatedMonths.map((month) => (
            <div key={month} className="month-section">
              <h2 className="month-title">{month.replace("de", "-")}</h2>
              <div className="news-list">
                {groupedNews[month].map((news) => {
                  const isExpanded = expanded[news.id];
                  const shouldTruncate =
                    news.summary.length > MAX_SUMMARY_LENGTH && !isExpanded;

                  return (
                    <div key={news.id} className="news-card">
                      <p className="news-summary">
                        {shouldTruncate
                          ? news.summary.slice(0, MAX_SUMMARY_LENGTH) + "..."
                          : news.summary}
                      </p>
                      {news.summary.length > MAX_SUMMARY_LENGTH && (
                        <button
                          onClick={() => toggleExpand(news.id)}
                          className="see-more"
                        >
                          {isExpanded ? "Ver menos" : "Ver mais"}
                        </button>
                      )}
                      <a
                        href={news.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="news-link"
                      >
                        <MdDocumentScanner /> Clique para acessar documento completo
                      </a>

                      <p className="delete" onClick={()=>handleDeleteNews(news.id)}>
                        <MdDelete></MdDelete> Clique para excluir newsletter!
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Paginação */}
          <div className="pagination">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
            >
              <img style={{ cursor: "pointer" }} src="/ChevronRight.png" alt="" />
            </button>
            <span>
              Mostrando {page + 1} de {Math.ceil(orderedMonths.length / MONTHS_PER_PAGE)}
            </span>
            <button
              onClick={() =>
                setPage((p) =>
                  p + 1 < Math.ceil(orderedMonths.length / MONTHS_PER_PAGE) ? p + 1 : p
                )
              }
              disabled={page + 1 >= Math.ceil(orderedMonths.length / MONTHS_PER_PAGE)}
            >
              <img
                style={{ transform: "rotate(180deg)", cursor: "pointer" }}
                src="/ChevronRight.png"
                alt=""
              />
            </button>
          </div>
        </section>
      ) : (
        <div className="empty-news">
          <BiFolderOpen size={48} />
          <p className="empty-text">Não há newsletters disponíveis no momento.</p>
        </div>
      )}

      <ConfirmationModal></ConfirmationModal>
    
      <Footer />
    </>
  );
};

export default NewsPage;
