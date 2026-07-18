// ===== 世界主要宗教 — 数据 =====
const RELIGIONS = [
  {
    id: "christianity", name: "基督教", emoji: "✝️", tagline: "因恩典得救",
    adherents: "约24亿", founded: "约公元30年 · 犹地亚", founder: "拿撒勒人耶稣",
    origins: "起源于罗马犹地亚的一场犹太弥赛亚运动,耶稣的门徒宣告他已复活。它在一代人的时间内脱离犹太会堂,历经三个世纪的逼迫,并在公元313年君士坦丁使其合法化之前已遍布罗马帝国。",
    scripture: "圣经——旧约与新约(共66卷)",
    god: "三位一体的独一真神——有位格、重关系;\"神就是爱\"(约翰一书4:8)。",
    problem: "罪——道德上的悖逆,使每个人与圣洁的神隔绝。",
    path: "恩典:藉着耶稣的死而复活获得赦免,凭信心领受,而非靠行为赚得(以弗所书2:8-9)。",
    afterlife: "身体复活与末日审判;与神同在的永生,或与神隔绝。",
    practices: "敬拜、祷告、洗礼、圣餐、读经、慷慨施予。",
    branches: "天主教(约13亿)、新教(约9亿)、东正教(约2.2亿)。"
  },
  {
    id: "islam", name: "伊斯兰教", emoji: "☪️", tagline: "顺服真主",
    adherents: "约20亿", founded: "公元610年 · 阿拉伯麦加", founder: "穆罕默德(570-632)",
    origins: "麦加商人穆罕默德自公元610年起报告他领受天使加百列(吉卜利勒)的启示。迁往麦地那(622年)之后,这一运动统一了阿拉伯半岛;在他去世后不到一个世纪,阿拉伯人的征服将其从西班牙传播至印度河流域。",
    scripture: "古兰经;圣训集",
    god: "独一真主(安拉),绝对唯一(认主独一,tawhid)——超越性的创造者与审判者;否认三位一体与道成肉身。",
    problem: "并非堕落,而是软弱与健忘——未能顺服真主的旨意;不承认原罪。",
    path: "五功——念、礼、课、斋、朝——行为将在审判时被衡量。",
    afterlife: "复活与审判;依据天平与真主的裁决,进入天园(Jannah)或火狱(Jahannam)。",
    practices: "每日五次礼拜(拜功)、斋月封斋、天课、清真饮食、清真寺礼拜。",
    branches: "逊尼派(约85-90%)、什叶派(约10-13%),两派内均有苏菲派。"
  },
  {
    id: "hinduism", name: "印度教", emoji: "🕉️", tagline: "解脱(解脱,moksha)",
    adherents: "约12亿", founded: "约公元前2300-1500年 · 印度河流域", founder: "无创始人——由吠陀传统发展而来",
    origins: "没有明确的创立时刻:印度-雅利安吠陀宗教自公元前1500年起与印度本土传统融合,历经数千年,又叠加了奥义书、两大史诗及中世纪虔信运动(巴克提)的影响。",
    scripture: "吠陀经、奥义书、薄伽梵歌、两大史诗",
    god: "梵(Brahman),至高实在,通过毗湿奴、湿婆、提毗女神等诸多神祇显现。",
    problem: "无明(avidya)与业力将灵魂(阿特曼)束缚于生死轮回(轮回,samsara)之中。",
    path: "诸瑜伽之道——虔信瑜伽(bhakti)、智慧瑜伽(jnana)、行为瑜伽(karma)、禅定瑜伽(raja)——通向解脱(moksha)。",
    afterlife: "依业力轮回转世,直至获得解脱(moksha)。",
    practices: "普迦(供奉仪式)、寺庙礼拜、节庆(排灯节、洒红节)、朝圣、瑜伽与冥想。",
    branches: "毗湿奴派、湿婆派、性力派、斯马尔塔派。"
  },
  {
    id: "buddhism", name: "佛教", emoji: "☸️", tagline: "止息(涅槃)",
    adherents: "约5亿", founded: "约公元前5世纪 · 北印度", founder: "悉达多·乔达摩(佛陀)",
    origins: "王子悉达多·乔达摩离开宫廷生活,寻求解脱苦难之道,在菩提伽耶证悟,并说法四十五年。僧团制度与阿育王(公元前3世纪)的护持,使这条道路传遍亚洲。",
    scripture: "巴利文大藏经(三藏);大乘经典",
    god: "无造物主——终极问题被搁置一旁,转而专注于通向觉悟的道路。",
    problem: "苦(dukkha),由贪爱与执着所致。",
    path: "四圣谛与八正道——止息贪爱。",
    afterlife: "由业力驱动的轮回转世,直至涅槃,即轮回的止息。",
    practices: "禅修、正念、戒律、僧团(僧伽)生活。",
    branches: "上座部佛教、大乘佛教、金刚乘(藏传)佛教、禅宗。"
  },
  {
    id: "judaism", name: "犹太教", emoji: "✡️", tagline: "守约的信实",
    adherents: "约1500万", founded: "约公元前2000-1300年 · 迦南与西奈", founder: "亚伯拉罕(立约)、摩西(妥拉)",
    origins: "根植于神与亚伯拉罕所立的约,以及摩西带领下的出埃及,历经西奈律法、先知与流亡时期的塑造——在公元70年罗马摧毁第二圣殿后,又重塑为拉比犹太教。",
    scripture: "塔纳赫(妥拉、先知书、圣录);塔木德",
    god: "独一真神,有位格、立约的神——\"以色列啊,你要听:耶和华我们神是独一的主\"(申命记6:4)。",
    problem: "罪即是破坏与神所立的约。",
    path: "悔改(teshuvah)、遵守妥拉、祷告与慈爱之行。",
    afterlife: "看法不一——来世(Olam Ha-Ba),弥赛亚时代的复活。",
    practices: "安息日、洁食律法、节期、会堂礼拜、研习经文。",
    branches: "正统派、保守派、改革派、重建派。"
  },
  {
    id: "sikhism", name: "锡克教", emoji: "🪯", tagline: "独一真神,诚实为生",
    adherents: "约2600万", founded: "公元1499年 · 印度旁遮普", founder: "古鲁那纳克(1469-1539),后有九位古鲁相继传承",
    origins: "在印度教与伊斯兰教两个世界之间的旁遮普,古鲁那纳克经历了一次启示性体验后宣告:\"既无印度教徒,也无穆斯林。\"此后九位继任古鲁建立了这一群体;第十位古鲁哥宾德·辛格创立卡尔萨(1699年),并将古鲁·格兰特·萨希卜奉为最终、永恒的古鲁。",
    scripture: "古鲁·格兰特·萨希卜——被尊为永恒、活着的古鲁",
    god: "独一无形的造物主(Ik Onkar,瓦黑古鲁),超越形象与性别,平等地临在于所有人之中。",
    problem: "自我(haumai)与执着通过轮回转世使灵魂与神分离。",
    path: "常念神名(naam japna)、诚实劳作谋生(kirat karo)、与人分享(vand chhako)。",
    afterlife: "轮回转世,直至灵魂与神合一。",
    practices: "五K标志、每日祷告、朗格尔(向所有人开放的免费社区厨房)、锡克庙礼拜。",
    branches: "卡尔萨传统;若干较小的教派(sampradaya)。"
  },
  {
    id: "bahai", name: "巴哈伊信仰", emoji: "✴️", tagline: "独一真神,人类一家",
    adherents: "约500-800万", founded: "公元1863年 · 波斯(伊朗)", founder: "巴哈欧拉(1817-1892)",
    origins: "源于波斯的巴布教运动(1844年),该运动期待一位应许者的到来。巴哈欧拉,一位巴布教贵族,于1863年在巴格达宣告自己即是那位应许者;他在阿卡狱中及流放期间的著作成为该信仰的经典,其后裔在世界各地组织了这一信仰。",
    scripture: "《亚格达斯经》及巴哈欧拉的著作",
    god: "独一不可知的神,通过历代使者渐进地启示——亚伯拉罕、摩西、佛陀、耶稣、穆罕默德、巴哈欧拉。",
    problem: "人类的分裂与灵性上的不成熟。",
    path: "认识这个时代神的使者;祷告、服务,并为人类的合一而努力。",
    afterlife: "灵魂永恒地朝向神迈进——天堂与地狱意味着亲近或疏远神。",
    practices: "每日祷告、每年为期19天的斋戒、服务人类;无神职人员。",
    branches: "在行政上于全世界统一;无重大教派分裂。"
  },
  {
    id: "jainism", name: "耆那教", emoji: "🤚", tagline: "非暴力至上",
    adherents: "约400-500万", founded: "约公元前6世纪 · 印度(传统认为其超越时间)", founder: "第24代祖师大雄(Mahavira)",
    origins: "大雄与佛陀同时代,三十岁时放弃王子生活,将印度更为古老的苦行(śramaṇa)传统系统化,成为这一宇宙纪元第24位、也是最后一位\"渡津者\"(Tirthankara,祖师)。",
    scripture: "阿含经(Agamas)",
    god: "无造物主——已解脱的灵魂(耆那,jina)被尊为楷模,而非被当作神祇崇拜。",
    problem: "业力——因暴力与激情而附着于灵魂(jiva)之上的微妙物质。",
    path: "三宝——正信、正智、正行——以非暴力(阿希姆萨)为根基。",
    afterlife: "轮回转世,直至灵魂摆脱一切业力,升入解脱(moksha)。",
    practices: "严格素食、斋戒、冥想、苦行僧生活。",
    branches: "天衣派(Digambara)、白衣派(Śvētāmbara)。"
  },
  {
    id: "zoroastrianism", name: "琐罗亚斯德教", emoji: "🔥", tagline: "善思、善言、善行",
    adherents: "约11万-12.5万", founded: "约公元前1200-1000年 · 古波斯", founder: "琐罗亚斯德(Zarathustra)",
    origins: "祭司先知琐罗亚斯德将古老的伊朗宗教重新塑造,以智慧之主阿胡拉·马兹达为中心。它先后成为三个波斯帝国的国教,直至伊斯兰征服使其沦为一个残存群体,其中一部分逃往印度,成为今日的帕西人。",
    scripture: "阿维斯陀经",
    god: "阿胡拉·马兹达(智慧之主),与破坏之灵安格拉·曼纽相对立——一种宇宙性的道德二元论。",
    problem: "真理(asha)与谎言(druj)之间的斗争,在每个人心中展开。",
    path: "选择良善:善思、善言、善行。",
    afterlife: "灵魂跨越钦瓦特桥,或得赏赐或受折磨;最终的更新(Frashokereti)将使万物复原。",
    practices: "圣火神庙礼拜、洁净仪式、季节性节庆(诺鲁孜节)。",
    branches: "帕西人(印度)、伊朗琐罗亚斯德教徒。"
  },
  {
    id: "taoism", name: "道教", emoji: "☯️", tagline: "顺应大道",
    adherents: "约1200万-2000万(文化影响范围更广)", founded: "约公元前6-4世纪 · 中国", founder: "老子(相传);庄子",
    origins: "在中国动荡的战国时代,围绕《道德经》(相传为老子所著)与《庄子》逐渐成形。有组织的道教始于张道陵创立的天师道运动(公元142年)。",
    scripture: "《道德经》、《庄子》",
    god: "道——万物无名的本源与规律;宗教性的道教中还加入了丰富的神祇体系。",
    problem: "违逆自然之道而强行作为,导致混乱与耗竭。",
    path: "无为——顺应大道、不强求的行动;质朴、谦逊、率性自然。",
    afterlife: "看法不一——宗教道教中修炼成仙,民间信仰中则延续祖先崇拜。",
    practices: "冥想、气功与太极、庙宇仪式、风水。",
    branches: "哲学道教(道家)与宗教道教(道教);全真派、正一派。"
  },
  {
    id: "confucianism", name: "儒家", emoji: "📜", tagline: "德行、家庭、和谐",
    adherents: "正式信奉者约600万;文化影响遍及逾十亿人", founded: "公元前551-479年 · 中国", founder: "孔子(孔夫子)",
    origins: "孔子是鲁国的一位小官员,身处一个礼崩乐坏的时代,他教导人们回归德行、礼仪与正当的人伦关系;他的弟子编纂了《论语》。汉代(公元前2世纪)将其学说定为官方正统,自此塑造东亚社会长达两千年。",
    scripture: "《论语》;五经",
    god: "天——作为道德秩序的存在——与其说是一种神学,不如说是一种伦理生活方式。",
    problem: "社会失序,根源于德行的败坏与人伦关系的破裂。",
    path: "修养仁与礼;敬重五伦,以家庭为始。",
    afterlife: "少有推想——敬奉祖先,并在当下正直地生活。",
    practices: "祖先祭祀、礼仪规范、研习经典、自我修养。",
    branches: "古典儒学、宋明理学(新儒家)。"
  },
  {
    id: "shinto", name: "神道教", emoji: "⛩️", tagline: "神灵之道",
    adherents: "虔诚信奉者约300-400万;大多数日本人在文化层面参与其中", founded: "史前时期 · 日本", founder: "无创始人",
    origins: "源自史前日本人对自然中神灵及氏族祖先的崇拜,逐渐凝聚成形。为区别于新传入的佛教(公元6世纪),这一信仰被命名为\"神道\"——神灵之道,其神话在《古事记》(公元712年)中被编纂成文。",
    scripture: "《古事记》与《日本书纪》(属于史书而非严格意义上的经典)",
    god: "无数神灵——存在于自然、祖先与场所之中的神圣临在。",
    problem: "不洁(kegare)而非罪。",
    path: "洁净(祓,harae)、真诚(诚,makoto)、敬畏神灵。",
    afterlife: "刻意留白——逝者或许会成为守护生者的祖先神灵。",
    practices: "参拜神社、节庆(祭)、人生仪礼、标示圣域的鸟居。",
    branches: "神社神道、教派神道、民间信仰。"
  },
  {
    id: "indigenous", name: "原住民与民间信仰", emoji: "🌍", tagline: "最古老的信仰之道",
    adherents: "全球约3-4亿", founded: "史前时期 · 每一个有人居住的大陆", founder: "无创始人——世代口耳相传",
    origins: "在每一个有人居住的大陆上,其历史比文字更为古老——通过神话、歌谣与仪式代代相传,并在迁徙、接触与殖民的过程中不断适应,延续至今。",
    scripture: "口传传统——神话、歌谣与仪式",
    god: "通常有一位至高的造物主,与赋予世界生机的诸灵及祖先并存。",
    problem: "与灵界、祖先或社群之间和谐关系的破裂。",
    path: "仪式、庆典、祖先崇拜与社群义务共同恢复平衡。",
    afterlife: "祖先的世界——逝者仍是社群生活的一部分。",
    practices: "人生仪礼、占卜、治疗仪式、季节性节庆。",
    branches: "数以千计各具特色的传统——约鲁巴人、拉科塔人、绍纳人、毛利人、中国民间信仰等等。"
  },
  {
    id: "lds", name: "末世圣徒(摩门教)", emoji: "📖", tagline: "福音的复兴",
    adherents: "约1700万", founded: "公元1830年 · 美国纽约州", founder: "约瑟·斯密(1805-1844)",
    origins: "诞生于第二次大觉醒期间,复兴运动席卷的纽约州上州\"燃烧地带\"。约瑟·斯密报告了他的\"第一次异象\"(1820年)以及天使摩罗乃的多次显现,引导他获得金页片;《摩门经》与一个新教会于1830年相继问世,斯密于1844年遇害后,杨百翰带领信众迁往犹他州。",
    scripture: "圣经(\"只要翻译正确\")、摩门经、教义和圣约、无价珍珠——外加一位在世先知",
    god: "圣父、圣子与圣灵是三个各自独立的位格,但目标合一。圣父拥有已得荣耀的实体身体(教义和圣约130:22),忠信的世人可以逐步进升至高荣——\"人现在如何,神曾经如何;神现在如何,人将来可如何\"(罗伦佐·斯诺)。主流基督教拒绝这种神观。",
    problem: "堕落(被视为必要的一步)与个人的罪;今生是永恒进升过程中的一场考验。",
    path: "对基督的信心、悔改、经由已复兴之祭司权柄施行的洗礼、圣殿中的礼仪与圣约,并坚忍到底——\"我们靠恩典得救,是在我们尽了一切所能之后\"(尼腓二书25:23)。",
    afterlife: "几乎所有人都将进入三层荣耀国度之一——celestial(荣耀国)、terrestrial(地界国)或telestial(平界国);忠信者在荣耀国中得升进;唯有极少数\"沦落之子\"进入外层黑暗。",
    practices: "圣餐聚会、圣殿敬拜、为已故者施洗、为期两年的传教服务、什一奉献、智慧语(不饮咖啡、茶、酒精,不用烟草)。",
    branches: "末世圣徒教会(规模最大,总部设于盐湖城);基督社区。"
  },
  {
    id: "jw", name: "耶和华见证人", emoji: "🗼", tagline: "耶和华的组织",
    adherents: "约870万活跃传道员", founded: "19世纪70年代 · 美国匹兹堡", founder: "查尔斯·泰兹·罗素;后由约瑟·卢瑟福重塑",
    origins: "源于19世纪70年代查尔斯·泰兹·罗素在匹兹堡主持的圣经研读小组,当时正值复临派对末世的强烈期待。该团体于1881年注册为守望台社,后在约瑟·卢瑟福领导下重组,并于1931年将运动更名为耶和华见证人。",
    scripture: "守望台自行翻译的《新世界译本》圣经,并透过守望台出版物研读",
    god: "唯独耶和华是全能的神。三位一体被否定:耶稣是耶和华所造的首生者(被认定即为天使长米迦勒),圣灵则是神非位格性的行动力量。",
    problem: "亚当所犯的罪带来了不完美与死亡;撒但目前统治着世上的各种体制。",
    path: "对耶和华及基督的赎价存有信心,挨家挨户传道,并对由治理机构领导的耶和华可见组织保持忠贞。",
    afterlife: "144000名\"受膏者\"在天上与基督一同作王;忠信的\"其余的羊\"将永远生活在一个恢复的乐园般的地球上。没有不朽的灵魂,也没有地狱——恶人将被彻底毁灭。",
    practices: "挨家挨户作见证、在王国聚会所聚会、每年一次的\"主的晚餐\"纪念聚会;不庆祝生日与节日,不服兵役,不接受输血。",
    branches: "由纽约沃威克总部集中管理;无宗派分支。"
  },
  {
    id: "scientology", name: "山达基教(科学教)", emoji: "🔺", tagline: "通向全然自由之桥",
    adherents: "存在争议——从数万到数十万不等", founded: "1954年 · 美国洛杉矶", founder: "L·罗恩·贺伯特(1911-1986)",
    origins: "科幻作家L·罗恩·贺伯特于1950年出版了自助疗法体系《戴尼提》,随后将其改组为一种宗教,于1954年创立山达基教会。它借助名人代言与积极扩张而发展壮大,至今仍具争议——在一些国家被承认为宗教,在另一些国家则遭到质疑。",
    scripture: "贺伯特的著作与讲座——《戴尼提》、山达基正典,以及机密的高阶(OT)资料",
    god: "没有明确的位格神——\"第八动力\"(无限)留待每个人自行去领悟;每个人都是一个\"希坦\"(thetan),一个存在了数万亿年的不朽灵性存在。",
    problem: "印痕(engram)——来自今生及无数前世的创伤性心理记录——蒙蔽了希坦,阻碍了其固有潜能的发挥。",
    path: "使用E计通过稽查(auditing)清除印痕,从\"清晰者\"(Clear)状态开始,沿着\"运作希坦\"(OT)各阶层攀登\"通向全然自由之桥\"——每一阶段皆需付费购买课程。",
    afterlife: "希坦离开肉身后再进入新的躯体——一个持续不断的轮回过程;没有天堂,也没有地狱。",
    practices: "稽查课程、培训课程、道德项目、职员或海洋机构(Sea Org)服务。",
    branches: "山达基教会;独立的\"自由地带\"山达基信徒。"
  },
  {
    id: "atheism", name: "无神论与世俗人文主义", emoji: "⚛️", tagline: "无神,意义自造",
    adherents: "无宗教信仰者约12亿", founded: "古已有之(伊壁鸠鲁、顺世论);现代形态始于启蒙运动", founder: "无创始人——从伊壁鸠鲁到\"新无神论者\"的一系思想家",
    origins: "古代的少数思想流派(希腊的伊壁鸠鲁、印度的顺世论)历经启蒙运动、达尔文与19至20世纪欧洲的世俗化进程,逐渐成为一种大众化的选择;道金斯、希钦斯、哈里斯与丹尼特等人所代表的\"新无神论\"在2001年之后为其注入了新的公共声量。",
    scripture: "无——以科学与理性作为可信赖的指引",
    god: "无。自然界的宇宙即是一切曾经存在、现在存在与将来存在的全部。",
    problem: "无知、迷信,以及组织不善的社会。",
    path: "理性、科学、世俗伦理与人类的繁荣发展;意义是被创造出来的,而非被发现的。",
    afterlife: "无——死亡是意识的永久终结。",
    practices: "无固定仪轨——人文主义社群、世俗庆典、公民生活。",
    branches: "无神论、不可知论、世俗人文主义,以及无宗教信仰的\"无教派者\"。"
  }
];

const FIELDS = [
  ["adherents", "信徒人数"],
  ["founded", "创立时间"],
  ["founder", "创始人"],
  ["origins", "起源"],
  ["god", "神/终极实在"],
  ["scripture", "经典"],
  ["problem", "人类的问题"],
  ["path", "解脱之道"],
  ["afterlife", "来世观"],
  ["practices", "宗教实践"],
  ["branches", "主要教派"]
];

// ===== 全宗教网格 + 详情弹窗 =====
const relGrid = document.getElementById('religionGrid');
const relModal = document.getElementById('relModal');
const relModalBody = document.getElementById('modalBody');

RELIGIONS.forEach(r => {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'tile';
  card.innerHTML = `<img src="../img/${r.id}.jpg" alt="${r.name}" loading="lazy">` +
    `<div class="tile-body"><div class="t-tag">${r.tagline}</div>` +
    `<h3><span class="t-emoji">${r.emoji}</span> ${r.name}</h3>` +
    `<p>${r.god}</p>` +
    `<span class="meta">${r.adherents} · ${r.founded.split('·')[0].trim()}</span>` +
    `<span class="t-go">查看完整档案 →</span></div>`;
  card.addEventListener('click', () => openRelModal(r));
  relGrid.appendChild(card);
});

function openRelModal(r) {
  relModalBody.innerHTML = `<div class="m-hero"><img src="../img/${r.id}.jpg" alt="${r.name}"></div>` +
    `<span class="m-emoji">${r.emoji}</span><h3>${r.name}</h3>` +
    `<div class="m-tagline">${r.tagline} · ${r.adherents}</div><dl>` +
    FIELDS.map(([k, label]) => `<div><dt>${label}</dt><dd>${r[k]}</dd></div>`).join('') +
    `</dl>`;
  relModal.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeRelModal() {
  relModal.hidden = true;
  document.body.style.overflow = '';
}
document.getElementById('modalClose').addEventListener('click', closeRelModal);
relModal.addEventListener('click', e => { if (e.target === relModal) closeRelModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !relModal.hidden) closeRelModal(); });

// ===== 比较实验室(选择2-5个,并排比较) =====
const MIN_PICK = 2, MAX_PICK = 5;
const picked = new Set(['christianity', 'islam', 'hinduism']);
const chipsBox = document.getElementById('compareChips');
const compareHint = document.getElementById('compareHint');
const compareOut = document.getElementById('compareOut');
const compareTable = document.getElementById('compareTable');
let hintTimer = null;

RELIGIONS.forEach(r => {
  const b = document.createElement('button');
  b.className = 'toggle' + (picked.has(r.id) ? ' active' : '');
  b.textContent = `${r.emoji} ${r.name}`;
  b.addEventListener('click', () => {
    if (picked.has(r.id)) {
      picked.delete(r.id);
    } else if (picked.size >= MAX_PICK) {
      flashHint(`一次最多选择${MAX_PICK}个——请先取消一个。`);
      return;
    } else {
      picked.add(r.id);
    }
    b.classList.toggle('active', picked.has(r.id));
    renderCompare();
  });
  chipsBox.appendChild(b);
});

function flashHint(msg) {
  compareHint.textContent = msg;
  compareHint.classList.add('warn');
  clearTimeout(hintTimer);
  hintTimer = setTimeout(() => { compareHint.classList.remove('warn'); setHint(); }, 2400);
}
function setHint() {
  compareHint.textContent = picked.size < MIN_PICK
    ? `再选择${MIN_PICK - picked.size}个——本实验室可同时比较${MIN_PICK}到${MAX_PICK}个宗教传统。`
    : `正在比较${picked.size}个宗教传统。点击标签可以更换(${MIN_PICK}-${MAX_PICK}个)。`;
}
function renderCompare() {
  setHint();
  if (picked.size < MIN_PICK) { compareOut.hidden = true; return; }
  const sel = RELIGIONS.filter(r => picked.has(r.id));
  compareTable.innerHTML =
    '<thead><tr><th></th>' + sel.map(r => `<th>${r.emoji} ${r.name}</th>`).join('') + '</tr></thead>' +
    '<tbody>' + FIELDS.map(([k, label]) =>
      `<tr><th>${label}</th>` + sel.map(r => `<td>${r[k]}</td>`).join('') + '</tr>'
    ).join('') + '</tbody>';
  compareOut.hidden = false;
}
renderCompare();
